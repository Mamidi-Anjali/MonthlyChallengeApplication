import React, { useState } from "react";
import './ChallengeCard.css';
import { FaTimes } from 'react-icons/fa';

// import '../styles.css';

function ChallengeCard({ challenges, onChallengeUpdated, onTaskDeleted }) {
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState("");
    const [editProgress, setEditProgress] = useState("");
    const [editDuedate, setEditDuedate] = useState(""); 

    const handleView = (challenge, index) => {
        setSelectedChallenge(challenge);
        setSelectedIndex(index);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditDescription(selectedChallenge.descriptionWithTimestamps[selectedIndex].description);
        setEditProgress(selectedChallenge.descriptionWithTimestamps[selectedIndex].progress);
        setEditDuedate(selectedChallenge.descriptionWithTimestamps[selectedIndex].duedate);

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedChallenge = {
                ...selectedChallenge,
                descriptionWithTimestamps: selectedChallenge.descriptionWithTimestamps.map((desc, idx) =>
                    idx === selectedIndex
                        ? {
                            ...desc,
                            description: editDescription,
                            progress: editProgress,
                            duedate: editDuedate
                        }
                        : desc
                )
            };
            await onChallengeUpdated(updatedChallenge);
            setIsEditing(false);
            setSelectedChallenge(updatedChallenge);
        } catch (error) {
            console.error("Error updating challenge: ", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            const taskId = selectedChallenge.descriptionWithTimestamps[selectedIndex].taskId;
            await onTaskDeleted(selectedChallenge.id, taskId);
            setSelectedChallenge(null); // Reset selected challenge
            setSelectedIndex(null); // Reset selected index
            
        }
    };

    const handleClose = () => {
        setSelectedChallenge(null);
        setSelectedIndex(null);
    };


    return (
        <div className="d-flex flex-wrap justify-content-around" >
            {challenges.map(challenge => (
                challenge.descriptionWithTimestamps.length > 0 && ( // Check if there are tasks for this month
                    <div className="card m-3"  style={{ width: "18rem" }} key={challenge.id}>
                        <div className="card-header">
                            {challenge.month}
                        </div>
                        <div>
                            <ul className="list-group list-group-flush">
                                {challenge.descriptionWithTimestamps.map((desc, index) => (
                                    // <li className="list-group-item clickable" key={index} onClick={() => handleView(challenge, index)}>
                                    //    <a href="#viewDescription" className="taskName">  {desc.task} </a>
                                    // </li>
                                    <li 
                                        className={`list-group-item clickable ${desc.progress === 'Completed' ? 'text-muted' : ''}`} 
                                        key={index} 
                                        onClick={() => handleView(challenge, index)}
                                    >
                                        <a href="#viewDescription" className="taskName">
                                        <span>{desc.task}</span>
                                        {desc.progress === 'Completed' && <span className="completed-task-tick"> ✅</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            ))}
            {selectedChallenge && (
                <div className="card mt-4 mb-3" style={{ width: "60%" }}>
                    <div className="card-header">
                       {selectedChallenge.month}: {selectedChallenge.descriptionWithTimestamps[selectedIndex].task}
                        <button className="btn btn-light float-end me-2" onClick={handleClose}><FaTimes size={18}/></button>
                        <button className="btn btn-danger float-end me-2" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-warning float-end" onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="card-body" id="viewDescription">
                        {isEditing ? (
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="editDescription">Description</label>
                                    <textarea className="form-control" id="editDescription" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="editProgress">Progress</label>
                                    <select className="form-select" id="editProgress" value={editProgress} onChange={(e) => setEditProgress(e.target.value)} required>
                                        <option value="">Select Progress</option>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="editDuedate">Duedate</label>
                                    <input className="form-control" id="editDuedate" type="date" value={editDuedate} onChange={(e) => setEditDuedate(e.target.value)} min={new Date().toISOString().split('T')[0]} placeholder="Duedate" required/>
                                </div>
                                <button className="btn btn-primary" type="submit" >Save Changes</button>
                                &nbsp; <button className="btn btn-secondary" >Close</button>
                            </form>
                        ) : (
                            <div>
                                {selectedChallenge.descriptionWithTimestamps.length > 0 && (
                                    <>
                                        <p><strong>Description:</strong> {selectedChallenge.descriptionWithTimestamps[selectedIndex].description}</p>
                                        <p><strong>Progress:</strong> {selectedChallenge.descriptionWithTimestamps[selectedIndex].progress}</p>
                                        <p><strong>DueDate:</strong> {selectedChallenge.descriptionWithTimestamps[selectedIndex].duedate}</p>
                                        <p><strong>Created on:</strong> {selectedChallenge.descriptionWithTimestamps[selectedIndex].timestamp}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChallengeCard;
