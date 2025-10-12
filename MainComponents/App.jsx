import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen';
import MainSection from './MainSection/MainSection';
import Footer from './Footer';
import Header from './Header';

const imageNames = ['checklist.png','goal.png','pomodoro.png','bg2.jpg']

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        let imgsLoaded = 0;
        imageNames.forEach(name=>{
            const img = new Image();
            img.src = import.meta.env.BASE_URL+name;
            img.onload = () => {
                imgsLoaded ++;
                if(imgsLoaded === 4) setIsLoaded(true);
                console.log(imgsLoaded);
            }
        })
    },[])
    return (
        <>
            { !isLoaded &&  <LoadingScreen />}
            { isLoaded && <div>
                <Header />
                <MainSection/>
                <Footer/>
            </div>}
        </>
    )
}

export default App;
