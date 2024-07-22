// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ChallengeCard from './components/ChallengeCard';
import AddChallenge from './components/AddChallenge';
import 'bootstrap/dist/css/bootstrap.min.css';
import Greeting from './components/Greeting';

function App() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        try {
            const response = await axios.get('http://localhost:8080/challenges');
            setChallenges(response.data);
        } catch (error) {
            console.error('Error fetching challenges: ', error);
        }
    };

    const handleChallengeAdded = () => {
        fetchChallenges(); // Refresh the challenges after Adding
    };

    const handleChallengeUpdated = async (updatedChallenge) => {
        try {
            await axios.put(`http://localhost:8080/challenges/${updatedChallenge.id}`, updatedChallenge);
            fetchChallenges(); // Refresh the challenges after updating
        } catch (error) {
            console.error('Error updating challenge: ', error);
        }
    };

    const handleTaskDeleted = async (id, taskId) => {
        try {
            // Make an API call to delete the task
            await axios.delete(`http://localhost:8080/challenges/${id}/${taskId}`);
            //TODO: TRY WITH CALLING fetchChallenges();
            // Update the frontend state after successful deletion
            const updatedChallenges = challenges.map(challenge => {
                if (challenge.id === id) {
                    const updatedDescriptions = challenge.descriptionWithTimestamps.filter(desc => desc.taskId !== taskId);
                    return { ...challenge, descriptionWithTimestamps: updatedDescriptions };
                }
                return challenge;
            });
            setChallenges(updatedChallenges);
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };
    
    

    return (
        <div>
            <Header />
            <div id="home">
                <Greeting />
            </div>
            <div className="container mt-4" id="addChallenge" style={{ paddingTop: '46px' }}>            
                <AddChallenge onChallengeAdded={handleChallengeAdded} />    
            </div>
            <div id="viewChallenge" className='mt-5' >
                <ChallengeCard challenges={challenges} onChallengeUpdated={handleChallengeUpdated} onTaskDeleted={handleTaskDeleted}  />
            </div>
        </div>
        
    );
}

export default App;