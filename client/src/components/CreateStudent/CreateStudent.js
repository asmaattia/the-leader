import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './CreateStudent.css';


const CreateStudent = () => {

    // Input values by the user
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [optionValue, setOptionValue] = useState('');
    const [mathValue, setMathValue] = useState(0);
    const [physiqueValue, setPhysiqueValue] = useState(0);
    const [scienceValue, setScienceValue] = useState(0);
    const [anglaisValue, setAnglaisValue] = useState(0);
    const [francaisValue, setFrancaisValue] = useState(0);
    const [stageValue, setStageValue] = useState('');

    // Helper function for the POST request
    const handlePost = async () => {
        if ((firstNameValue === '') || 
            (lastNameValue === '') || 
            (optionValue === '') || 
            (stageValue === '') || 
            (mathValue < 0) || 
            (physiqueValue < 0) || 
            (scienceValue < 0) || 
            (anglaisValue < 0) || 
            (francaisValue < 0)) {
            return;
        }

        const student = {
            first_name: firstNameValue,
            last_name: lastNameValue,
            option: optionValue,
            math: mathValue,
            physique: physiqueValue,
            science: scienceValue,
            anglais: anglaisValue,
            francais: francaisValue,
            stage: stageValue
        }
        
        await axios.post('/students', student)
                    .then(alert('Etudiant a ete cree avec succes!'))
                    .catch(err => console.log(err));
    }

    return ( 
        <div className="create-main">
            <h1>Créez un nouvel etudiant</h1>
            <form>
                <div className="form-group">
                    Créez un etudiant en inserant leur nom et prénom, leur option, leur notes des matiers, et finalement, le nom de la societe de leur stage precedant.
                </div>
                <div className="form-group">
                    <label htmlFor="student-first-name">Prénom</label>
                    <input type="text" className="form-control" name="student-first-name" id="student-first-name" placeholder="Prénom" onChange={(e) => setFirstNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="student-last-name">Nom</label>
                    <input type="text" className="form-control" name="student-last-name" id="student-last-name" placeholder="Nom" onChange={(e) => setLastNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="student-option">Option</label> <br />
                    <select name="student-option" id="student-option" onChange={(e) => setOptionValue(e.target.value)} required>
                        <option value="" selected disabled hidden>Choisissez une option</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Langues">Langues</option>
                        <option value="Infographie">Infographie</option>
                        <option value="Secretariat">Secretariat</option>
                        <option value="Developpement Humain">Developpement Humain</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="student-stage">Stage</label>
                    <input type="text" className="form-control" name="student-stage" id="student-stage" placeholder="Stage" onChange={(e) => setStageValue(e.target.value)} required/>
                </div>
                <div className="matiers-group">
                    <div className="form-group">
                        <label htmlFor="student-math">Math</label>
                        <input type="number" className="form-control" name="student-math" id="student-math" placeholder="0.0" min={0} max={20} required onChange={(e) => setMathValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-physique">Physique</label>
                        <input type="number" className="form-control" name="student-physique" id="student-physique" placeholder="0.0" min={0} max={20} required onChange={(e) => setPhysiqueValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-science">Science</label>
                        <input type="number" className="form-control" name="student-science" id="student-science" placeholder="0.0" min={0} max={20} required onChange={(e) => setScienceValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-anglais">Anglais</label>
                        <input type="number" className="form-control" name="student-anglais" id="student-anglais" placeholder="0.0" min={0} max={20} required onChange={(e) => setAnglaisValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-francais">Francais</label>
                        <input type="number" className="form-control" name="student-francais" id="student-francais" placeholder="0.0" min={0} max={20} required onChange={(e) => setFrancaisValue(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group" >
                    <button type="submit" className="btn btn-primary" onClick={handlePost}>Soumettre</button>
                    <Link to="/" className="btn btn-danger" id="cancel-button">Retourner</Link>
                </div>
            </form>
        </div>
     );
}
 
export default CreateStudent;