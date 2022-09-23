import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';


const EditStudent = () => {

    // State passed from the home page
    const location = useLocation();
    const oldStudent = Object.assign({}, location.state.student);

    // Input values by the user
    const [firstNameValue, setFirstNameValue] = useState(oldStudent.first_name);
    const [lastNameValue, setLastNameValue] = useState(oldStudent.last_name);
    const [optionValue, setOptionValue] = useState(oldStudent.option);
    const [mathValue, setMathValue] = useState(oldStudent.math);
    const [physiqueValue, setPhysiqueValue] = useState(oldStudent.physique);
    const [scienceValue, setScienceValue] = useState(oldStudent.science);
    const [anglaisValue, setAnglaisValue] = useState(oldStudent.anglais);
    const [francaisValue, setFrancaisValue] = useState(oldStudent.francais);
    const [stageValue, setStageValue] = useState(oldStudent.stage);


    // Handle the Patch Request
    const handlePatch = async () => {
        if ((firstNameValue === '') || 
            (lastNameValue === '') || 
            (optionValue === '') || 
            (stageValue === '') || 
            (mathValue < 0) || 
            (physiqueValue < 0) || 
            (scienceValue < 0) || 
            (anglaisValue < 0) || 
            (francaisValue < 0)) {
            alert('Erreur! Svp verifiez les donnees.')
            return;
        }

        const patchedStudent = [
            { "propName": "first_name", "value": firstNameValue },
            { "propName": "last_name", "value": lastNameValue },
            { "propName": "option", "value": optionValue },
            { "propName": "math", "value": mathValue },
            { "propName": "physique", "value": physiqueValue },
            { "propName": "science", "value": scienceValue },
            { "propName": "anglais", "value": anglaisValue },
            { "propName": "francais", "value": francaisValue },
            { "propName": "stage", "value": stageValue }
        ]

        await axios.patch('/students/'+oldStudent._id, patchedStudent)
                    .then(() => {
                        alert('Etudiant a ete modifier avec succes!');
                       
                    })
                    .catch(err => console.log(err));
    }

    return ( 
        <div className="create-main">
            <h1>Modifiez l'etudiant "{oldStudent.first_name} {oldStudent.last_name}"</h1>
            <form>
                <div className="form-group">
                Modifiez l'etudiant en inserant leur nom et prénom, leur option, leur notes des matiers, et finalement, le nom de la societe de leur stage precedant.
                </div>
                <div className="form-group">
                    <label htmlFor="student-first-name">Prénom</label>
                    <input type="text" className="form-control" name="student-first-name" id="student-first-name" placeholder="Prénom" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="student-last-name">Nom</label>
                    <input type="text" className="form-control" name="student-last-name" id="student-last-name" placeholder="Nom" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="student-option">Option</label> <br />
                    <select name="student-option" id="student-option" onChange={(e) => setOptionValue(e.target.value)} required>
                        <option value={optionValue} selected disabled hidden>{optionValue}</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Langues">Langues</option>
                        <option value="Infographie">Infographie</option>
                        <option value="Secretariat">Secretariat</option>
                        <option value="Developpement Humain">Developpement Humain</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="student-stage">Stage</label>
                    <input type="text" className="form-control" name="student-stage" id="student-stage" placeholder="Stage" value={stageValue} onChange={(e) => setStageValue(e.target.value)} required/>
                </div>
                <div className="matiers-group">
                    <div className="form-group">
                        <label htmlFor="student-math">Math</label>
                        <input type="number" className="form-control" name="student-math" id="student-math" placeholder="Math" value={mathValue}  min={0} max={20} required onChange={(e) => setMathValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-physique">Physique</label>
                        <input type="number" className="form-control" name="student-physique" id="student-physique" placeholder="Physique" value={physiqueValue} min={0} max={20} required onChange={(e) => setPhysiqueValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-science">Science</label>
                        <input type="number" className="form-control" name="student-science" id="student-science" placeholder="Science" value={scienceValue} min={0} max={20} required onChange={(e) => setScienceValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-anglais">Anglais</label>
                        <input type="number" className="form-control" name="student-anglais" id="student-anglais" placeholder="Anglais" value={anglaisValue} min={0} max={20} required onChange={(e) => setAnglaisValue(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="student-francais">Francais</label>
                        <input type="number" className="form-control" name="student-francais" id="student-francais" placeholder="Francais" value={francaisValue} min={0} max={20} required onChange={(e) => setFrancaisValue(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group" >
                    <Link to="/" type="submit" className="btn btn-primary" onClick={handlePatch}>Modifier</Link>
                    <Link to="/" className="btn btn-danger" id="cancel-button">Retourner</Link>
                </div>
            </form>
        </div>
     );
}
 
export default EditStudent;