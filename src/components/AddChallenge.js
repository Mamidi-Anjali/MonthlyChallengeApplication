import { useState } from "react";
import axios from "axios";
// import '../styles.css';

function AddChallenge({ onChallengeAdded }) {
    const [month, setMonth] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState('');
    const [duedate, setDuedate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const descriptionWithTimestamp = {
                task,
                description,
                timestamp: new Date().toISOString(),
                progress,
                duedate
            };
            await axios.post('http://localhost:8080/challenges', { month, descriptionWithTimestamps: [descriptionWithTimestamp] });
            setTask('');
            setMonth('');
            setDescription('');
            setProgress('');
            setDuedate('');
            onChallengeAdded();
        } catch (error) {
            console.error("error adding challenges: ", error);
        }
    };

    return (
        <div className="card d-flex justify-content-center">
            <div className="card-header">
                <h2> Add New Challenge</h2>
            </div>
            <div className="card-body">
            <form className="row" onSubmit={handleSubmit}>
                    
                    <div className="mb-3 col-12">
                        <label className="form-label" htmlFor="task">Task</label>
                        <input type="text" className="form-control" id="task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Name The Task" required />
                    </div>

                    <div className="mb-3 col-12">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the Challenge" required></textarea>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="month" className="form-label">Month</label>
                        <select className="form-select"
                            id="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            aria-label="Select a Month"
                            required
                        >
                            <option value="">Select a Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label className="form-label" htmlFor="progress">Progress</label>
                        <select className="form-select"
                            id="progress"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                            aria-label="Select Progress"
                            required
                        >
                            <option value="">Select Progress</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label className="form-label" htmlFor="duedate">Duedate</label>
                        <input className="form-control" id="duedate" type="date" value={duedate} onChange={(e) => setDuedate(e.target.value)} min={new Date().toISOString().split('T')[0]} placeholder="Duedate" required/>
                    </div>
                 
                    <button className="btn btn-primary col-12" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddChallenge;
