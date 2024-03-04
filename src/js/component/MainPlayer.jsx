import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
// import { array } from "prop-types";

//create your first component
const MainPlayer = () => {

    const [currentSong, setCurrentSong] = useState(0);

    const [playing, setPlaying] = useState(false);

    var audioJS = null;

    const [newSongs, setNewSongs] = useState([]);

    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/sound/songs')
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then(responseAsJson => {
                // Do stuff with the JSONified response
                setNewSongs(responseAsJson);
                console.log(responseAsJson);
            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            });
    }, []);

    const playAudio = (ind) => {
        // if ((ind <= (tunesArray.length - 1)) && (ind >= 0)) {
        let songUrl = 'https://playground.4geeks.com/apis/fake/sound/' + newSongs[ind].url
        audioJS.src = songUrl;
        audioJS.play();
        setCurrentSong(ind);
        setPlaying(true);

        // }

    }

    const pauseAudio = () => {
        audioJS.pause();
        setPlaying(false);
    }

    return (
        <>
            {newSongs.map(
                (songObj, ind) => {
                    return (
                        <div className={"col-7   text-white p-1" + (currentSong == ind ? ' bg-secondary' : ' bg-dark')}
                            key={ind}
                            // style={{ backgroundColor: currentSong == ind ? "gray" : "black" }}
                            onClick={() => {
                                playAudio(ind);

                            }
                            }
                        >
                            <span>{ind + 1} - </span> {songObj.name}
                        </div>)
                }
            )}
            <div className="col-7  bg-dark text-white text-center p-1">
                <audio ref={elm => audioJS = elm} />
                <button className="fs-2 me-5"
                    onClick={() => currentSong == (0) ? playAudio(newSongs.length - 1)
                        : playAudio(currentSong - 1)
                    }
                ><i className="fa-solid fa-backward"></i></button>
                <button className="playerButton text-white fs-2 bg-dark"
                    onClick={() => playAudio(currentSong)}
                    style={{ display: playing ? "none" : "inline" }}
                ><i className="fa-solid fa-play"></i></button>

                <button className="playerButton text-white fs-2 bg-dark"
                    onClick={() =>
                        pauseAudio()
                    }
                    style={{ display: playing ? "inline" : "none" }}
                ><i className="fa-solid fa-pause"></i></button>
                <button className="fs-2 ms-5"
                    onClick={() => currentSong == (newSongs.length - 1) ? playAudio(0)
                        : playAudio(currentSong + 1)
                    }
                ><i className="fa-solid fa-forward"></i></button>
            </div>
            {console.log(currentSong)}
        </>

    );
};

export default MainPlayer;