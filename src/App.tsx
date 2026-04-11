import { useState } from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import ScrollReveal from './components/ScrollReveal';
import Cursor      from './components/Cursor';
import Loader      from './components/Loader';
import GrainOverlay from './components/GrainOverlay';
import BackToTop   from './components/BackToTop';
import useLenis    from './hooks/useLenis';
import './index.scss';

function App() {
    const [mode, setMode]     = useState<string>('dark');
    const [loaded, setLoaded] = useState<boolean>(false);
    const lenisRef            = useLenis();

    const handleModeChange = () => {
        setMode(m => m === 'dark' ? 'light' : 'dark');
    };

    return (
    <>
        {/* ── Page-load overlay — unmounts after wipe animation ── */}
        {!loaded && <Loader onDone={() => setLoaded(true)} />}

        {/* ── Film grain — fixed, z-index 997, pointer-events none ── */}
        <GrainOverlay />

        {/* ── Custom cursor ── */}
        <Cursor />

        {/* ── Main content ── */}
        <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}${loaded ? ' app--loaded' : ''}`}>
            <Navigation parentToChild={{mode}} modeChange={handleModeChange} lenisRef={lenisRef}/>
            <Main/>
            <Expertise/>
            <Timeline/>
            <ScrollReveal delay={0}>
                <Project/>
            </ScrollReveal>
            <ScrollReveal delay={0}>
                <Contact/>
            </ScrollReveal>
            <Footer />

            {/* ── Back-to-top appears after 50% scroll depth ── */}
            <BackToTop lenisRef={lenisRef} />
        </div>
    </>
    );
}

export default App;