import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, ArrowDown, ArrowLeft, ArrowUp, BookOpen, Bookmark, BookmarkCheck, BrainCircuit, CalendarDays, Check, CheckCircle2, ChevronRight, Clock3, Download, Flag, Gauge, GraduationCap, Home, Library, Link2, Menu, Moon, NotebookPen, Play, Plus, Search, Settings, Sparkles, Sun, Target, Timer, Trash2, Upload, WandSparkles, X, Zap } from 'lucide-react'
import { courses, learningPaths } from './data'
import { isReviewDue, rateReview, startReview } from './review'
import { exportPayload, initialState, lessonProgress, loadState, saveState, validateImport } from './store'
import type { AppState, Course, Goal as GoalType, Lesson, Note, ReviewRating } from './types'

type Page = 'home' | 'library' | 'builder' | 'paths' | 'notes' | 'review' | 'goals' | 'analytics' | 'settings'
const nav: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Today', icon: Home }, { id: 'library', label: 'Library', icon: Library }, { id: 'builder', label: 'Course builder', icon: WandSparkles }, { id: 'paths', label: 'Learning paths', icon: GraduationCap },
  { id: 'notes', label: 'Notes', icon: NotebookPen }, { id: 'review', label: 'Review', icon: BrainCircuit }, { id: 'goals', label: 'Goals', icon: Target }, { id: 'analytics', label: 'Progress', icon: Activity },
]
const today = () => new Date().toISOString().slice(0, 10)
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [page, setPage] = useState<Page>('home')
  const [activeCourse, setActiveCourse] = useState<Course | null>(null)
  const [activeLesson, setActiveLesson] = useState<(Lesson & { courseId?: string }) | null>(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('learning-os:theme') === 'dark')
  const [toast, setToast] = useState('')
  const [quickFind, setQuickFind] = useState(false)

  useEffect(() => saveState(state), [state])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('learning-os:theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2500); return () => clearTimeout(timer) }, [toast])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setQuickFind(value => !value) }
      if (event.key === 'Escape') setQuickFind(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const completedCount = state.completedLessons.length
  const availableCourses = useMemo(() => [...courses, ...state.customCourses], [state.customCourses])
  const availableLessons = useMemo(() => availableCourses.flatMap(course => course.modules.flatMap(module => module.lessons.map(lesson => ({ ...lesson, courseId: course.id, courseTitle: course.title, moduleTitle: module.title })))), [availableCourses])
  const dueReviewCount = Object.values(state.reviews ?? {}).filter(review => isReviewDue(review)).length
  const totalMinutes = state.sessions.reduce((sum, item) => sum + item.minutes, 0)
  const streak = useMemo(() => {
    const set = new Set([...state.streakDates, ...state.sessions.map(s => s.date)])
    let count = 0; const d = new Date()
    while (set.has(d.toISOString().slice(0, 10))) { count++; d.setDate(d.getDate() - 1) }
    return count
  }, [state])
  const update = (fn: (current: AppState) => AppState) => setState(current => fn(current))
  const announce = (message: string) => setToast(message)
  const openCourse = (course: Course) => { setActiveCourse(course); setActiveLesson(null); setMobileNav(false); window.scrollTo(0, 0) }
  const openLesson = (lesson: Lesson, courseId?: string) => { if (courseId) setActiveCourse(availableCourses.find(course => course.id === courseId) ?? null); setActiveLesson({ ...lesson, courseId }); window.scrollTo(0, 0) }
  const go = (next: Page) => { setPage(next); setActiveCourse(null); setActiveLesson(null); setMobileNav(false); window.scrollTo(0, 0) }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Zap size={19} fill="currentColor" /></span><span>Learning <b>OS</b></span><button className="icon-btn mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X /></button></div>
      <p className="eyebrow nav-caption">MY WORKSPACE</p>
      <nav>{nav.map(item => <button key={item.id} className={page === item.id && !activeCourse ? 'active' : ''} onClick={() => go(item.id)}><item.icon size={19} /><span>{item.label}</span>{item.id === 'notes' && state.notes.length > 0 && <small>{state.notes.length}</small>}{item.id === 'review' && dueReviewCount > 0 && <small>{dueReviewCount}</small>}</button>)}</nav>
      <div className="sidebar-card">
        <div className="sidebar-card-top"><span className="mini-bolt"><Sparkles size={15} /></span><b>Weekly rhythm</b></div>
        <div className="week-dots">{[-6,-5,-4,-3,-2,-1,0].map(offset => { const d = new Date(); d.setDate(d.getDate()+offset); const key=d.toISOString().slice(0,10); const hit=state.streakDates.includes(key)||state.sessions.some(s=>s.date===key); return <span key={key} className={hit?'hit':''}>{d.toLocaleDateString('en',{weekday:'narrow'})}</span> })}</div>
        <p><b>{streak} day streak</b><br/>A little progress still counts.</p>
      </div>
      <button className="profile-card" onClick={() => go('settings')}><span className="avatar">PG</span><span><b>My workspace</b><small>Private on this device</small></span><Settings size={17}/></button>
    </aside>
    {mobileNav && <button className="backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
    <main>
      <header className="topbar">
        <button className="icon-btn menu-btn" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu /></button>
        <div className="crumb">{activeLesson ? <><button onClick={() => setActiveLesson(null)}>{activeCourse?.title ?? 'Lesson'}</button><ChevronRight size={14}/><span>{activeLesson.title}</span></> : activeCourse ? <><button onClick={() => go('library')}>Library</button><ChevronRight size={14}/><span>{activeCourse.title}</span></> : <span>{nav.find(n=>n.id===page)?.label}</span>}</div>
        <button className="quick-search" onClick={()=>{setQuickFind(true);setMobileNav(false)}} aria-label="Search courses, lessons and notes"><Search/><span>Search anything…</span><kbd>{navigator.platform.includes('Mac')?'⌘':'Ctrl'} K</kbd></button>
        <div className="top-actions"><span className="privacy"><span/> Saved locally</span><button className="icon-btn" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun/>:<Moon/>}</button></div>
      </header>
      <div className="content">
        {activeLesson && <LessonView lesson={activeLesson} course={activeCourse ?? availableCourses.find(c=>c.id===activeLesson.courseId)} state={state} update={update} back={()=>setActiveLesson(null)} openLesson={openLesson} announce={announce} />}
        {!activeLesson && activeCourse && <CourseView course={activeCourse} state={state} openLesson={openLesson} />}
        {!activeLesson && !activeCourse && page === 'home' && <Dashboard state={state} completedCount={completedCount} totalMinutes={totalMinutes} streak={streak} availableCourses={availableCourses} availableLessons={availableLessons} openCourse={openCourse} openLesson={openLesson} go={go} />}
        {!activeLesson && !activeCourse && page === 'library' && <LibraryPage state={state} availableCourses={availableCourses} openCourse={openCourse} go={go} />}
        {!activeLesson && !activeCourse && page === 'builder' && <CourseBuilder state={state} update={update} openCourse={openCourse} announce={announce} />}
        {!activeLesson && !activeCourse && page === 'paths' && <PathsPage state={state} openCourse={openCourse} />}
        {!activeLesson && !activeCourse && page === 'notes' && <NotesPage state={state} availableLessons={availableLessons} update={update} openLesson={openLesson} announce={announce} />}
        {!activeLesson && !activeCourse && page === 'review' && <ReviewPage state={state} availableLessons={availableLessons} update={update} openLesson={openLesson} announce={announce} />}
        {!activeLesson && !activeCourse && page === 'goals' && <GoalsPage state={state} update={update} announce={announce} />}
        {!activeLesson && !activeCourse && page === 'analytics' && <AnalyticsPage state={state} availableCourses={availableCourses} />}
        {!activeLesson && !activeCourse && page === 'settings' && <SettingsPage state={state} setState={setState} dark={dark} setDark={setDark} announce={announce} />}
      </div>
    </main>
    {quickFind && <QuickFind courses={availableCourses} lessons={availableLessons} notes={state.notes} close={()=>setQuickFind(false)} openCourse={openCourse} openLesson={openLesson} openNotes={()=>go('notes')} />}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>
}

function QuickFind({courses,lessons,notes,close,openCourse,openLesson,openNotes}:{courses:Course[];lessons:(Lesson&{courseId:string;courseTitle:string;moduleTitle:string})[];notes:Note[];close:()=>void;openCourse:(course:Course)=>void;openLesson:(lesson:Lesson,courseId?:string)=>void;openNotes:()=>void}) {
  const [query,setQuery]=useState(''); const inputRef=useRef<HTMLInputElement>(null)
  useEffect(()=>inputRef.current?.focus(),[])
  const term=query.trim().toLowerCase()
  const courseResults=term?courses.filter(course=>`${course.title} ${course.description} ${course.category}`.toLowerCase().includes(term)).slice(0,4):[]
  const lessonResults=term?lessons.filter(lesson=>`${lesson.title} ${lesson.summary} ${lesson.courseTitle} ${lesson.moduleTitle}`.toLowerCase().includes(term)).slice(0,7):[]
  const noteResults=term?notes.filter(note=>`${note.title} ${note.body}`.toLowerCase().includes(term)).slice(0,4):[]
  const resultCount=courseResults.length+lessonResults.length+noteResults.length
  const choose=(action:()=>void)=>{close();action()}
  return <div className="quick-find-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)close()}}><section className="quick-find-dialog" role="dialog" aria-modal="true" aria-label="Quick Find">
    <div className="quick-find-input"><Search/><input ref={inputRef} aria-label="Quick Find search" placeholder="Search courses, lessons and notes…" value={query} onChange={event=>setQuery(event.target.value)}/><button onClick={close} aria-label="Close search"><X/></button></div>
    <div className="quick-find-results">
      {!term&&<div className="quick-find-hint"><Sparkles/><h2>Find anything in your learning space</h2><p>Search by lesson, topic, course, or words from one of your notes.</p><span>Tip: press <kbd>{navigator.platform.includes('Mac')?'⌘ K':'Ctrl K'}</kbd> anytime</span></div>}
      {term&&resultCount===0&&<Empty icon={Search} title="Nothing found" text="Try another topic or a shorter search."/>}
      {courseResults.length>0&&<div className="quick-find-group"><p className="eyebrow">COURSES</p>{courseResults.map(course=><button key={course.id} onClick={()=>choose(()=>openCourse(course))}><span className="quick-result-icon">{course.icon}</span><div><b>{course.title}</b><small>{course.category} · {course.level}</small></div><ChevronRight/></button>)}</div>}
      {lessonResults.length>0&&<div className="quick-find-group"><p className="eyebrow">LESSONS</p>{lessonResults.map(lesson=><button key={lesson.id} onClick={()=>choose(()=>openLesson(lesson,lesson.courseId))}><span className="quick-result-icon"><BookOpen/></span><div><b>{lesson.title}</b><small>{lesson.courseTitle} · {lesson.moduleTitle}</small></div><ChevronRight/></button>)}</div>}
      {noteResults.length>0&&<div className="quick-find-group"><p className="eyebrow">NOTES</p>{noteResults.map(note=><button key={note.id} onClick={()=>choose(openNotes)}><span className="quick-result-icon"><NotebookPen/></span><div><b>{note.title}</b><small>{note.body}</small></div><ChevronRight/></button>)}</div>}
    </div>
  </section></div>
}

function Dashboard({ state, completedCount, totalMinutes, streak, availableCourses, availableLessons, openCourse, openLesson, go }: { state: AppState; completedCount: number; totalMinutes: number; streak: number; availableCourses: Course[]; availableLessons: (Lesson & {courseId:string;courseTitle:string;moduleTitle:string})[]; openCourse: (c: Course)=>void; openLesson: (l: Lesson, c?: string)=>void; go: (p: Page)=>void }) {
  const next = availableLessons.find(l => !state.completedLessons.includes(l.id)) ?? availableLessons[0]
  const course = availableCourses.find(c => c.id === next.courseId)!
  return <>
    <section className="welcome"><div><p className="eyebrow">{new Date().toLocaleDateString('en',{weekday:'long'}).toUpperCase()} · YOUR LEARNING SPACE</p><h1>Good morning. <em>What will you learn?</em></h1><p>Keep building useful knowledge—one focused session at a time.</p></div><div className="date-tile"><span>{new Date().toLocaleDateString('en',{month:'short'}).toUpperCase()}</span><b>{new Date().getDate()}</b></div></section>
    <section className="metric-grid">
      <Metric icon={CheckCircle2} label="Lessons complete" value={String(completedCount)} hint={`of ${availableLessons.length} in library`} color="coral" />
      <Metric icon={Clock3} label="Focused time" value={totalMinutes < 60 ? `${totalMinutes}m` : `${Math.floor(totalMinutes/60)}h ${totalMinutes%60}m`} hint="logged study time" color="green" />
      <Metric icon={Zap} label="Current streak" value={`${streak} day${streak===1?'':'s'}`} hint="show up, keep moving" color="gold" />
      <Metric icon={Flag} label="Open goals" value={String(state.goals.filter(g=>!g.completed).length)} hint="personal commitments" color="purple" />
    </section>
    <div className="section-heading"><div><p className="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>Your next lesson</h2></div><button className="text-btn" onClick={()=>go('library')}>Browse library <ChevronRight size={17}/></button></div>
    <section className="continue-card" style={{'--accent':course.accent} as React.CSSProperties}>
      <div className="course-symbol">{course.icon}</div><div className="continue-main"><span className="pill">{course.category} · {course.level}</span><h3>{next.title}</h3><p>{next.summary}</p><div className="meta"><span><BookOpen size={16}/>{next.moduleTitle}</span><span><Clock3 size={16}/>{next.minutes} min</span></div></div>
      <div className="continue-action"><ProgressRing value={lessonProgress(state.completedLessons, course.modules.flatMap(m=>m.lessons.map(l=>l.id)))} /><button className="primary" onClick={()=>openLesson(next, course.id)}><Play size={16} fill="currentColor"/>Start lesson</button></div>
    </section>
    <div className="two-col home-bottom">
      <section><div className="section-heading compact"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured courses</h2></div></div><div className="course-grid">{courses.filter(c=>c.featured).map(c=><CourseCard key={c.id} course={c} state={state} onClick={()=>openCourse(c)} />)}</div></section>
      <aside className="today-plan"><p className="eyebrow">TODAY'S FOCUS</p><h2>A calm 45 minutes</h2><div className="focus-row"><span><Play size={17}/></span><div><b>Learn</b><small>Complete one focused lesson</small></div><em>30m</em></div><div className="focus-row"><span><NotebookPen size={17}/></span><div><b>Recall</b><small>Write three useful notes</small></div><em>10m</em></div><div className="focus-row"><span><Check size={17}/></span><div><b>Review</b><small>Try the lesson check</small></div><em>5m</em></div><button className="secondary" onClick={()=>openLesson(next, course.id)}>Begin focus session</button></aside>
    </div>
  </>
}

function Metric({ icon: Icon, label, value, hint, color }: { icon: typeof Home; label:string; value:string; hint:string; color:string }) { return <div className="metric-card"><span className={`metric-icon ${color}`}><Icon size={20}/></span><div><small>{label}</small><b>{value}</b><p>{hint}</p></div></div> }

function CourseCard({ course, state, onClick }: { course: Course; state: AppState; onClick:()=>void }) {
  const ids=course.modules.flatMap(m=>m.lessons.map(l=>l.id)); const p=lessonProgress(state.completedLessons,ids)
  return <button className="course-card" onClick={onClick} style={{'--accent':course.accent} as React.CSSProperties}><div className="course-card-top"><span className="course-icon">{course.icon}</span><span className="pill">{course.level}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="progress-line"><span style={{width:`${p}%`}} /></div><footer><span>{p}% complete</span><span>{ids.length} lessons <ChevronRight size={15}/></span></footer></button>
}

function LibraryPage({ state, availableCourses, openCourse, go }: { state: AppState; availableCourses: Course[]; openCourse:(c:Course)=>void; go:(p:Page)=>void }) {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('All')
  const filtered=availableCourses.filter(c=>(category==='All'||c.category===category)&&(`${c.title} ${c.description}`.toLowerCase().includes(query.toLowerCase())))
  return <><div className="intro-action"><PageIntro eyebrow="YOUR KNOWLEDGE SHELF" title="Course library" text="Structured learning for any subject. Start with the seeded courses, then shape the system around your interests." /><button className="primary" onClick={()=>go('builder')}><Plus/>Build personal course</button></div>
    <div className="filterbar"><label className="search"><Search size={18}/><input aria-label="Search courses" placeholder="Search courses and topics…" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="chips">{['All','Electrical','Programming','AI','Science','Personal'].map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
    <div className="library-grid">{filtered.map(c=><CourseCard key={c.id} course={c} state={state} onClick={()=>openCourse(c)}/>)}</div>{!filtered.length&&<Empty icon={Search} title="No matching courses" text="Try a broader search or another category."/>}</>
}

function CourseView({ course, state, openLesson }: { course:Course; state:AppState; openLesson:(l:Lesson,c?:string)=>void }) {
  const ids=course.modules.flatMap(m=>m.lessons.map(l=>l.id)); const p=lessonProgress(state.completedLessons,ids)
  return <><section className="course-hero" style={{'--accent':course.accent} as React.CSSProperties}><div className="hero-symbol">{course.icon}</div><div><span className="pill">{course.category} · {course.level}</span><h1>{course.title}</h1><p>{course.description}</p><div className="meta"><span><Library size={17}/>{course.modules.length} modules</span><span><BookOpen size={17}/>{ids.length} lessons</span><span><Clock3 size={17}/>{Math.round(course.modules.flatMap(m=>m.lessons).reduce((s,l)=>s+l.minutes,0)/60)} hours</span></div></div><ProgressRing value={p}/></section>
    <div className="module-list">{course.modules.map((module,mi)=><section key={module.id} className="module"><div className="module-head"><span>{String(mi+1).padStart(2,'0')}</span><div><h2>{module.title}</h2><p>{module.description}</p></div></div>{module.lessons.map((lesson,li)=>{const done=state.completedLessons.includes(lesson.id);return <button className="lesson-row" key={lesson.id} onClick={()=>openLesson(lesson,course.id)}><span className={`lesson-status ${done?'done':''}`}>{done?<Check size={16}/>:li+1}</span><div><b>{lesson.title}</b><small>{lesson.summary}</small></div><span className="lesson-time"><Clock3 size={15}/>{lesson.minutes} min</span><ChevronRight size={18}/></button>})}</section>)}</div></>
}

type DraftLesson = { id:string; title:string; url:string; minutes:number }

function CourseBuilder({state,update,openCourse,announce}:{state:AppState;update:(fn:(s:AppState)=>AppState)=>void;openCourse:(course:Course)=>void;announce:(message:string)=>void}) {
  const [title,setTitle]=useState(''); const [description,setDescription]=useState(''); const [category,setCategory]=useState<Course['category']>('Personal'); const [level,setLevel]=useState<Course['level']>('Beginner'); const [sourceUrl,setSourceUrl]=useState('');
  const [draftLessons,setDraftLessons]=useState<DraftLesson[]>([{id:uid(),title:'',url:'',minutes:30}]); const [aiText,setAiText]=useState(''); const [error,setError]=useState('')
  const updateDraft=(id:string,patch:Partial<DraftLesson>)=>setDraftLessons(items=>items.map(item=>item.id===id?{...item,...patch}:item))
  const move=(index:number,direction:-1|1)=>setDraftLessons(items=>{const target=index+direction;if(target<0||target>=items.length)return items;const copy=[...items];[copy[index],copy[target]]=[copy[target],copy[index]];return copy})
  const parseAiList=()=>{
    const parsed=aiText.split('\n').map(line=>line.trim()).filter(Boolean).map((line,index)=>{
      const markdown=line.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/); const rawUrl=line.match(/https?:\/\/[^\s|)]+/); const url=markdown?.[2]??rawUrl?.[0]??''
      const cleaned=line.replace(/^[-*\d.)\s]+/,'').replace(url,'').replace(/[|–—-]+\s*$/,'').trim(); const parts=cleaned.split('|').map(part=>part.trim()).filter(Boolean); const minuteMatch=line.match(/\b(\d{1,3})\s*(?:min|minutes?)\b/i)
      return {id:uid(),title:markdown?.[1]??parts[0]??`Lesson ${index+1}`,url,minutes:minuteMatch?Number(minuteMatch[1]):30}
    }).filter(item=>item.url)
    if(!parsed.length){setError('Paste one lesson per line with a YouTube or resource URL.');return}
    setDraftLessons(parsed);setError('');announce(`${parsed.length} lessons imported`)
  }
  const createCourse=()=>{
    const usable=draftLessons.filter(item=>item.title.trim()&&(item.url.trim()||sourceUrl.trim()))
    if(!title.trim()){setError('Add a course name first.');return} if(!usable.length){setError('Add at least one lesson title and link.');return}
    const courseId=`personal-${uid()}`; const personalCourse:Course={id:courseId,title:title.trim(),category,level,description:description.trim()||'A personal course built from your chosen online learning resources.',accent:'#397a72',icon:'◇',modules:[{id:`${courseId}-module`,title:'My learning sequence',description:'Complete each lesson in order, then continue to the next one.',lessons:usable.map((item,index)=>({id:`${courseId}-lesson-${index+1}`,title:item.title.trim(),minutes:item.minutes||30,summary:`Lesson ${index+1} of ${usable.length} in your personal ${title.trim()} course.`,objectives:['Study the linked resource','Capture the key ideas in your own notes','Mark complete when you are ready to continue'],resources:[{title:item.title.trim(),url:item.url.trim()||sourceUrl.trim(),kind:'Video',language:'English'}]}))}]}
    update(current=>({...current,customCourses:[...current.customCourses,personalCourse]}));setTitle('');setDescription('');setSourceUrl('');setAiText('');setDraftLessons([{id:uid(),title:'',url:'',minutes:30}]);setError('');announce('Personal course added to your library');openCourse(personalCourse)
  }
  return <><PageIntro eyebrow="BUILD YOUR OWN PATH" title="Personal course builder" text="Paste a YouTube playlist, individual videos, or lesson links suggested by an AI. Put them in the order you want, then learn one lesson at a time."/>
    <div className="builder-layout"><section className="builder-main"><div className="builder-section"><div className="builder-section-head"><span>1</span><div><h2>Course details</h2><p>Name the subject and optionally keep the original playlist or course link.</p></div></div><div className="builder-fields"><label className="wide"><span>Course name</span><input placeholder="e.g. PLC Programming in Tamil" value={title} onChange={e=>setTitle(e.target.value)}/></label><label><span>Category</span><select value={category} onChange={e=>setCategory(e.target.value as Course['category'])}>{['Electrical','Programming','AI','Science','Business','Languages','Personal'].map(value=><option key={value}>{value}</option>)}</select></label><label><span>Level</span><select value={level} onChange={e=>setLevel(e.target.value as Course['level'])}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label className="wide"><span>Description</span><textarea placeholder="What do you want to learn from this course?" value={description} onChange={e=>setDescription(e.target.value)}/></label><label className="wide"><span>Playlist or main course link <em>optional</em></span><div className="input-icon"><Link2/><input type="url" placeholder="https://youtube.com/playlist?list=…" value={sourceUrl} onChange={e=>setSourceUrl(e.target.value)}/></div></label></div></div>
      <div className="builder-section"><div className="builder-section-head"><span>2</span><div><h2>Add lessons in order</h2><p>Each item becomes a lesson. Move them up or down before saving.</p></div><button className="secondary" onClick={()=>setDraftLessons(items=>[...items,{id:uid(),title:'',url:'',minutes:30}])}><Plus/>Add lesson</button></div><div className="draft-lessons">{draftLessons.map((item,index)=><div className="draft-lesson" key={item.id}><span className="order-number">{index+1}</span><div className="draft-inputs"><input aria-label={`Lesson ${index+1} title`} placeholder="Lesson title" value={item.title} onChange={e=>updateDraft(item.id,{title:e.target.value})}/><div className="link-minutes"><input aria-label={`Lesson ${index+1} URL`} type="url" placeholder="YouTube or resource URL" value={item.url} onChange={e=>updateDraft(item.id,{url:e.target.value})}/><label><input aria-label={`Lesson ${index+1} minutes`} type="number" min="1" max="600" value={item.minutes} onChange={e=>updateDraft(item.id,{minutes:Number(e.target.value)})}/><span>min</span></label></div></div><div className="order-actions"><button aria-label={`Move lesson ${index+1} up`} disabled={index===0} onClick={()=>move(index,-1)}><ArrowUp/></button><button aria-label={`Move lesson ${index+1} down`} disabled={index===draftLessons.length-1} onClick={()=>move(index,1)}><ArrowDown/></button><button aria-label={`Remove lesson ${index+1}`} disabled={draftLessons.length===1} onClick={()=>setDraftLessons(items=>items.filter(row=>row.id!==item.id))}><Trash2/></button></div></div>)}</div></div>
      {error&&<p className="form-error">{error}</p>}<button className="primary create-course" onClick={createCourse}><Sparkles/>Create personal course</button></section>
      <aside className="ai-import"><span className="ai-icon"><WandSparkles/></span><p className="eyebrow">PASTE FROM AI</p><h2>Import a lesson list</h2><p>Ask any AI for an ordered course plan with free links, then paste one lesson per line.</p><pre>Lesson title | https://youtube.com/... | 30 min</pre><textarea aria-label="AI lesson list" placeholder={'Introduction | https://youtu.be/... | 20 min\nCore concepts | https://youtu.be/... | 35 min'} value={aiText} onChange={e=>setAiText(e.target.value)}/><button className="secondary" onClick={parseAiList}><WandSparkles/>Import lesson list</button><div className="ai-tip"><b>Good AI prompt</b><p>“Create an ordered 8-lesson course about [topic]. Prefer Tamil videos, then English. Return: lesson title | free URL | minutes.”</p></div></aside>
    </div>
    {state.customCourses.length>0&&<section className="personal-courses"><div className="section-heading"><div><p className="eyebrow">SAVED LOCALLY</p><h2>Your personal courses</h2></div></div><div className="library-grid">{state.customCourses.map(course=><article className="personal-course-row" key={course.id}><button onClick={()=>openCourse(course)}><span className="course-icon">{course.icon}</span><div><b>{course.title}</b><small>{course.modules.flatMap(module=>module.lessons).length} ordered lessons · {course.level}</small></div><ChevronRight/></button><button className="remove-course" aria-label={`Delete ${course.title}`} onClick={()=>{if(confirm(`Delete “${course.title}” from this device?`)){update(current=>({...current,customCourses:current.customCourses.filter(item=>item.id!==course.id)}));announce('Personal course deleted')}}}><Trash2/></button></article>)}</div></section>}
  </>
}

function LessonView({ lesson, course, state, update, back, openLesson, announce }: { lesson:Lesson&{courseId?:string}; course?:Course; state:AppState; update:(fn:(s:AppState)=>AppState)=>void; back:()=>void; openLesson:(lesson:Lesson,courseId?:string)=>void; announce:(m:string)=>void }) {
  const [note,setNote]=useState(()=>state.notes.find(n=>n.lessonId===lesson.id)?.body??'')
  const [quizChoice,setQuizChoice]=useState<number|null>(null); const [checked,setChecked]=useState(false); const [minutes,setMinutes]=useState(25)
  const complete=state.completedLessons.includes(lesson.id); const bookmarked=state.bookmarks.includes(lesson.id)
  const orderedLessons=course?.modules.flatMap(module=>module.lessons)??[]; const lessonIndex=orderedLessons.findIndex(item=>item.id===lesson.id); const nextLesson=lessonIndex>=0?orderedLessons[lessonIndex+1]:undefined
  const saveNote=()=>{ const existing=state.notes.find(n=>n.lessonId===lesson.id); const next:Note={id:existing?.id??uid(),lessonId:lesson.id,title:lesson.title,body:note,updatedAt:new Date().toISOString()}; update(s=>({...s,notes:[...s.notes.filter(n=>n.lessonId!==lesson.id),next]})); announce('Note saved') }
  const logSession=()=>{update(s=>({...s,sessions:[...s.sessions,{id:uid(),courseId:course?.id,minutes,date:today(),note:lesson.title}],streakDates:Array.from(new Set([...s.streakDates,today()]))}));announce(`${minutes} minutes logged`) }
  const markComplete=()=>{update(s=>{const reviews={...(s.reviews??{})};if(complete)delete reviews[lesson.id];else reviews[lesson.id]=startReview(lesson.id,today());return{...s,reviews,completedLessons:complete?s.completedLessons.filter(id=>id!==lesson.id):[...s.completedLessons,lesson.id],streakDates:Array.from(new Set([...s.streakDates,today()]))}});announce(complete?'Lesson marked incomplete':'Lesson completed — review scheduled for tomorrow')}
  return <><button className="back-link" onClick={back}><ArrowLeft size={17}/>Back to course</button><div className="lesson-layout"><article className="lesson-content"><div className="lesson-title"><span className="pill">{course?.title??'Independent lesson'}</span><h1>{lesson.title}</h1><div className="meta"><span><Clock3 size={16}/>{lesson.minutes} minutes</span><span><Gauge size={16}/>Focused learning</span></div></div><section className="prose-card"><p className="lead">{lesson.summary}</p><h2>By the end, you can</h2><ul className="objectives">{lesson.objectives.map(o=><li key={o}><CheckCircle2 size={18}/>{o}</li>)}</ul></section><section><div className="section-heading compact"><div><p className="eyebrow">LEARN FROM THE WEB</p><h2>Free resources</h2></div></div><div className="resource-list">{lesson.resources.map(r=><a key={r.url} href={r.url} target="_blank" rel="noreferrer"><span className="resource-icon">{r.kind==='Video'?<Play/>:r.kind==='Tool'?<Sparkles/>:<BookOpen/>}</span><div><b>{r.title}</b><small>{r.kind} · {r.language}{r.language==='Tamil'?' · Preferred':''}</small></div><ChevronRight/></a>)}</div></section>{lesson.quiz?.map(q=><section className="quiz-card" key={q.id}><p className="eyebrow">KNOWLEDGE CHECK</p><h2>{q.prompt}</h2><div className="quiz-options">{q.options.map((opt,i)=><button key={opt} onClick={()=>{setQuizChoice(i);setChecked(false)}} className={`${quizChoice===i?'selected':''} ${checked&&i===q.answer?'correct':''} ${checked&&quizChoice===i&&i!==q.answer?'wrong':''}`}><span>{String.fromCharCode(65+i)}</span>{opt}</button>)}</div>{checked&&<p className="explanation">{quizChoice===q.answer?'Correct. ':`The correct answer is ${String.fromCharCode(65+q.answer)}. `}{q.explanation}</p>}<button className="secondary" disabled={quizChoice===null} onClick={()=>{setChecked(true);update(s=>{const correct=quizChoice===q.answer;const reviews=s.reviews??{};const review=reviews[lesson.id]??startReview(lesson.id,today());return{...s,quizScores:correct?{...s.quizScores,[q.id]:100}:s.quizScores,reviews:{...reviews,[lesson.id]:correct?rateReview(review,'good',today()):{...review,due:today(),intervalDays:1,repetitions:0,lastReviewed:today(),lastRating:'again'}}}})}}>Check answer</button></section>)}</article><aside className="lesson-aside"><div className="sticky"><button className={`complete-btn ${complete?'done':''}`} onClick={markComplete}>{complete?<><Check/>Completed</>:<><CheckCircle2/>Mark complete</>}</button>{complete&&nextLesson&&<button className="next-btn" onClick={()=>openLesson(nextLesson,course?.id)}>Next lesson <ChevronRight/></button>}{complete&&!nextLesson&&<div className="course-finished"><Sparkles/><b>Course complete</b><small>You finished every lesson.</small></div>}<button className="bookmark-btn" onClick={()=>update(s=>({...s,bookmarks:bookmarked?s.bookmarks.filter(id=>id!==lesson.id):[...s.bookmarks,lesson.id]}))}>{bookmarked?<BookmarkCheck/>:<Bookmark/>}{bookmarked?'Bookmarked':'Bookmark lesson'}</button><div className="timer-box"><p className="eyebrow">LOG FOCUS TIME</p><div><Timer/><input type="number" min="1" max="240" value={minutes} onChange={e=>setMinutes(Math.max(1,Number(e.target.value)))}/><span>min</span></div><button onClick={logSession}>Save session</button></div><div className="note-box"><p className="eyebrow">QUICK NOTE</p><textarea aria-label="Lesson note" placeholder="Capture the idea in your own words…" value={note} onChange={e=>setNote(e.target.value)}/><button onClick={saveNote}>Save note</button></div></div></aside></div></>
}

function PathsPage({ state, openCourse }: { state:AppState; openCourse:(c:Course)=>void }) { return <><PageIntro eyebrow="GUIDED JOURNEYS" title="Learning paths" text="Follow a deliberate sequence across subjects, or dip into any course when curiosity leads."/><div className="path-list">{learningPaths.map(path=>{const pathCourses=path.courseIds.map(id=>courses.find(c=>c.id===id)!).filter(Boolean);const ids=pathCourses.flatMap(c=>c.modules.flatMap(m=>m.lessons.map(l=>l.id)));const p=lessonProgress(state.completedLessons,ids);return <section className="path-card" key={path.id}><div className="path-summary"><span className="path-icon">{path.icon}</span><div><p className="eyebrow">{pathCourses.length} COURSE PATH</p><h2>{path.title}</h2><p>{path.description}</p></div><ProgressRing value={p}/></div><div className="path-courses">{pathCourses.map((course,i)=><button key={course.id} onClick={()=>openCourse(course)}><span>{i+1}</span><div><b>{course.title}</b><small>{course.level} · {course.modules.flatMap(m=>m.lessons).length} lessons</small></div><ChevronRight/></button>)}</div></section>})}</div></> }

function NotesPage({ state, availableLessons, update, openLesson, announce }: {state:AppState;availableLessons:(Lesson&{courseId:string;courseTitle:string})[];update:(fn:(s:AppState)=>AppState)=>void;openLesson:(l:Lesson,c?:string)=>void;announce:(m:string)=>void}) {
  const [draft,setDraft]=useState(''); const [title,setTitle]=useState(''); const add=()=>{if(!draft.trim())return;update(s=>({...s,notes:[...s.notes,{id:uid(),title:title.trim()||'Independent note',body:draft.trim(),updatedAt:new Date().toISOString()}]}));setDraft('');setTitle('');announce('Note added')}
  return <><PageIntro eyebrow="YOUR SECOND BRAIN" title="Notes" text="Capture ideas in your own words. Notes stay only in this browser unless you export a backup."/><div className="notes-layout"><section className="new-note"><input aria-label="Note title" placeholder="Note title" value={title} onChange={e=>setTitle(e.target.value)}/><textarea aria-label="New note" placeholder="What did you understand, question, or want to remember?" value={draft} onChange={e=>setDraft(e.target.value)}/><button className="primary" onClick={add}><Plus size={17}/>Add note</button></section><section className="notes-list">{state.notes.length===0?<Empty icon={NotebookPen} title="No notes yet" text="Your lesson and independent notes will collect here."/>:state.notes.slice().sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).map(note=>{const lesson=availableLessons.find(l=>l.id===note.lessonId);return <article className="note-card" key={note.id}><div><p className="eyebrow">{lesson?lesson.courseTitle:'INDEPENDENT NOTE'}</p><h3>{note.title}</h3><p>{note.body}</p><small>{new Date(note.updatedAt).toLocaleDateString()}</small></div><footer>{lesson&&<button onClick={()=>openLesson(lesson,lesson.courseId)}>Open lesson</button>}<button onClick={()=>{update(s=>({...s,notes:s.notes.filter(n=>n.id!==note.id)}));announce('Note removed')}}>Delete</button></footer></article>})}</section></div></>
}

function ReviewPage({state,availableLessons,update,openLesson,announce}:{state:AppState;availableLessons:(Lesson&{courseId:string;courseTitle:string;moduleTitle:string})[];update:(fn:(s:AppState)=>AppState)=>void;openLesson:(l:Lesson,c?:string)=>void;announce:(m:string)=>void}) {
  const scheduled=Object.values(state.reviews??{}).map(review=>({review,lesson:availableLessons.find(item=>item.id===review.lessonId)})).filter((item):item is {review:typeof item.review;lesson:NonNullable<typeof item.lesson>}=>Boolean(item.lesson)).sort((a,b)=>a.review.due.localeCompare(b.review.due))
  const due=scheduled.filter(item=>isReviewDue(item.review));const upcoming=scheduled.filter(item=>!isReviewDue(item.review));const current=due[0]
  const submit=(rating:ReviewRating)=>{if(!current)return;update(s=>({...s,reviews:{...(s.reviews??{}),[current.review.lessonId]:rateReview(current.review,rating,today())},streakDates:Array.from(new Set([...s.streakDates,today()]))}));announce(`Review saved — next in ${rateReview(current.review,rating,today()).intervalDays} days`)}
  return <><PageIntro eyebrow="REMEMBER WHAT YOU LEARN" title="Smart revision" text="Completed and difficult lessons return at useful intervals. Recall the idea first, then rate how well you remembered it."/>
    <section className="review-metrics"><div><b>{due.length}</b><span>due today</span></div><div><b>{scheduled.length}</b><span>in revision</span></div><div><b>{upcoming[0]?new Date(`${upcoming[0].review.due}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'}):'—'}</b><span>next upcoming</span></div></section>
    {current?<section className="review-focus"><div className="review-focus-top"><span className="review-icon"><BrainCircuit/></span><div><p className="eyebrow">{current.review.due<today()?'OVERDUE REVIEW':'DUE TODAY'} · {current.lesson.courseTitle}</p><h2>{current.lesson.title}</h2><p>{current.lesson.summary}</p></div></div><div className="review-prompt"><b>Recall before reopening</b><p>Explain the main idea in your own words. What would you use it for, and which step is easiest to forget?</p></div><div className="review-actions"><button className="secondary" onClick={()=>openLesson(current.lesson,current.lesson.courseId)}><BookOpen/>Open lesson</button><div className="rating-buttons"><button onClick={()=>submit('again')}><b>Again</b><small>1 day</small></button><button onClick={()=>submit('hard')}><b>Hard</b><small>short interval</small></button><button onClick={()=>submit('good')}><b>Good</b><small>normal interval</small></button><button onClick={()=>submit('easy')}><b>Easy</b><small>long interval</small></button></div></div></section>:<section className="review-clear"><CheckCircle2/><div><h2>Revision complete for today</h2><p>Finish another lesson or return when the next scheduled review becomes due.</p></div></section>}
    {upcoming.length>0&&<section className="upcoming-reviews"><div className="section-heading compact"><div><p className="eyebrow">COMING UP</p><h2>Revision schedule</h2></div></div><div>{upcoming.slice(0,8).map(({review,lesson})=><button key={lesson.id} onClick={()=>openLesson(lesson,lesson.courseId)}><span>{new Date(`${review.due}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span><div><b>{lesson.title}</b><small>{lesson.courseTitle} · every {review.intervalDays} day{review.intervalDays===1?'':'s'}</small></div><ChevronRight/></button>)}</div></section>}
  </>
}

function GoalsPage({state,update,announce}:{state:AppState;update:(fn:(s:AppState)=>AppState)=>void;announce:(m:string)=>void}) {
  const [title,setTitle]=useState('');const [target,setTarget]=useState(3);const [unit,setUnit]=useState<GoalType['unit']>('lessons');const [due,setDue]=useState(new Date(Date.now()+7*86400000).toISOString().slice(0,10));const add=()=>{if(!title.trim())return;update(s=>({...s,goals:[...s.goals,{id:uid(),title:title.trim(),target,unit,due,completed:false}]}));setTitle('');announce('Goal created')}
  return <><PageIntro eyebrow="MAKE IT INTENTIONAL" title="Goals" text="Set small, measurable commitments. A useful goal should make the next action obvious."/><section className="goal-form"><label><span>What do you want to achieve?</span><input placeholder="e.g. Finish cable sizing module" value={title} onChange={e=>setTitle(e.target.value)}/></label><label><span>Target</span><input type="number" min="1" value={target} onChange={e=>setTarget(Number(e.target.value))}/></label><label><span>Measure</span><select value={unit} onChange={e=>setUnit(e.target.value as GoalType['unit'])}><option>lessons</option><option>minutes</option><option>sessions</option></select></label><label><span>Due date</span><input type="date" value={due} onChange={e=>setDue(e.target.value)}/></label><button className="primary" onClick={add}><Plus/>Create goal</button></section><div className="goals-grid">{state.goals.map(goal=><article className={`goal-card ${goal.completed?'done':''}`} key={goal.id}><button className="goal-check" onClick={()=>update(s=>({...s,goals:s.goals.map(g=>g.id===goal.id?{...g,completed:!g.completed}:g)}))}>{goal.completed?<Check/>:null}</button><div><span className="pill">{goal.target} {goal.unit}</span><h3>{goal.title}</h3><p><CalendarDays size={15}/>Due {new Date(`${goal.due}T12:00:00`).toLocaleDateString()}</p></div><button className="delete-mini" onClick={()=>update(s=>({...s,goals:s.goals.filter(g=>g.id!==goal.id)}))}><X/></button></article>)}</div></>
}

function AnalyticsPage({state,availableCourses}:{state:AppState;availableCourses:Course[]}) {
  const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const key=d.toISOString().slice(0,10);return{key,label:d.toLocaleDateString('en',{weekday:'short'}),minutes:state.sessions.filter(s=>s.date===key).reduce((a,s)=>a+s.minutes,0)}});const max=Math.max(...days.map(d=>d.minutes),30);const total=state.sessions.reduce((a,s)=>a+s.minutes,0)
  return <><PageIntro eyebrow="SEE THE COMPOUND EFFECT" title="Progress analytics" text="A quiet view of what you have completed, practised and returned to."/><div className="analytics-grid"><section className="chart-card"><div className="section-heading compact"><div><p className="eyebrow">LAST 7 DAYS</p><h2>Focused minutes</h2></div><b>{total} min total</b></div><div className="bar-chart">{days.map(d=><div key={d.key}><span className="bar-value">{d.minutes||''}</span><i style={{height:`${Math.max(4,(d.minutes/max)*100)}%`}}/><small>{d.label}</small></div>)}</div></section><section className="chart-card"><p className="eyebrow">COURSE PROGRESS</p><h2>Across your library</h2><div className="course-progress-list">{availableCourses.map(c=>{const ids=c.modules.flatMap(m=>m.lessons.map(l=>l.id));const p=lessonProgress(state.completedLessons,ids);return <div key={c.id}><span>{c.icon}</span><div><b>{c.title}</b><div className="progress-line"><span style={{width:`${p}%`,background:c.accent}}/></div></div><em>{p}%</em></div>})}</div></section></div><section className="history-card"><p className="eyebrow">RECENT STUDY SESSIONS</p><h2>Study log</h2>{state.sessions.length===0?<Empty icon={Timer} title="No study time logged" text="Open a lesson and save your first focus session."/>:<div className="session-list">{state.sessions.slice().reverse().map(s=><div key={s.id}><span><Timer/></span><div><b>{s.note||'Focused study'}</b><small>{new Date(`${s.date}T12:00:00`).toLocaleDateString()} · {availableCourses.find(c=>c.id===s.courseId)?.title??'General learning'}</small></div><em>{s.minutes} min</em></div>)}</div>}</section></>
}

function SettingsPage({state,setState,dark,setDark,announce}:{state:AppState;setState:(s:AppState)=>void;dark:boolean;setDark:(v:boolean)=>void;announce:(m:string)=>void}) {
  const fileRef=useRef<HTMLInputElement>(null)
  const download=()=>{const blob=new Blob([exportPayload(state)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`learning-os-backup-${today()}.json`;a.click();URL.revokeObjectURL(a.href);announce('Backup exported')}
  const importFile=async(e:React.ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(!file)return;try{setState(validateImport(JSON.parse(await file.text())));announce('Backup restored')}catch(err){announce(err instanceof Error?err.message:'Could not import backup')}e.target.value=''}
  return <><PageIntro eyebrow="YOUR WORKSPACE" title="Settings & data" text="Learning OS is private by default. Your data lives in this browser and remains under your control."/><div className="settings-grid"><section className="settings-card"><span className="settings-icon"><Sun/></span><div><h2>Appearance</h2><p>Choose the theme that feels easiest to focus in.</p><div className="segment"><button className={!dark?'active':''} onClick={()=>setDark(false)}><Sun/>Light</button><button className={dark?'active':''} onClick={()=>setDark(true)}><Moon/>Dark</button></div></div></section><section className="settings-card"><span className="settings-icon"><Download/></span><div><h2>Backup your learning</h2><p>Export all progress, notes, goals, review schedule and personal courses as a readable JSON file. Upload it to Google Drive manually if desired.</p><button className="secondary" onClick={download}><Download/>Export backup</button></div></section><section className="settings-card"><span className="settings-icon"><Upload/></span><div><h2>Restore a backup</h2><p>Download your JSON backup from Google Drive, then choose it here. Importing replaces this browser's data.</p><input ref={fileRef} hidden type="file" accept="application/json" onChange={importFile}/><button className="secondary" onClick={()=>fileRef.current?.click()}><Upload/>Choose backup</button></div></section><section className="settings-card danger"><span className="settings-icon"><X/></span><div><h2>Reset workspace</h2><p>Erase local progress and return to the seeded learning library.</p><button className="secondary" onClick={()=>{if(confirm('Reset all local Learning OS data? This cannot be undone unless you exported a backup.')){setState(initialState);announce('Workspace reset')}}}>Reset all data</button></div></section></div><section className="privacy-card"><div><p className="eyebrow">PRIVACY BY DESIGN</p><h2>No account. No tracking. No hidden cloud.</h2><p>The app does not use an API or send learning data anywhere. Backups are ordinary JSON files that you control and can store manually in Google Drive.</p></div><span><Zap/></span></section></>
}

function PageIntro({eyebrow,title,text}:{eyebrow:string;title:string;text:string}) { return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></section> }
function ProgressRing({value}:{value:number}) { return <div className="progress-ring" style={{'--value':value} as React.CSSProperties}><div><b>{value}%</b><small>complete</small></div></div> }
function Empty({icon:Icon,title,text}:{icon:typeof Home;title:string;text:string}) { return <div className="empty"><Icon/><h3>{title}</h3><p>{text}</p></div> }

export default App
