import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/the-leader-logo.png';
import './HomePage.css';

const HomePage = () => {


    // Grouping the API data insude of an array of objects.
    let [studentsArray, setStudentsArray] = useState([]);

    // Input of the option
    const [option, setOption] = useState("")

    // React hook to fetch the data
    useEffect(() => {
        axios.get('/students')
            .then(res => setStudentsArray(res.data.students))
            .catch(err => console.error(err));
    }, []);

    // Helper function for the delete request
    const handleItemDelete = async (id, firstName, lastName) => {
        if (confirm("Est ce que vous etes sure de supprimer l'etudiant " + firstName+ " "+ lastName +" ?") == true) {
            await axios.delete('/students/'+id).then(res => console.log(res));
            window.location.reload();
        }
    }

    
    return ( 
        <div className='main-home'>
            <img id='logo-image' src={logo} alt="The leader logo" />
            <div className="image-parallax">
                <div className="info-box mb-5 pt-5">
                    <h2>Centre de Formation Nabeul</h2>
                    <h1>The Leader</h1>
                    <p>Bienvenue chey le Centre de Formation the Leader <br/>
                    Des formations qui vous assurent des chances de travail en Tunisie et à l’Etranger !!!</p>
                </div>
            </div>
            <h1>Liste des etudiants du centre</h1>
            <div  className="create-item mb-5">
                <p>Voici la liste des etudiants du centre. <br/> Vous pouvez ajouter, modifier, ou supprimer des etudiants dans cette liste.</p>
                <label><b>Cliquez ici pour ajouter un etudiant: </b></label>
                <Link to="/create" className="btn btn-info" style={{ 'marginLeft': '20px'}}>Ajouter</Link>
            </div>
            <div className='opt-btn'>
                <h4>Choisissez le nom de l'option pour filtrer les donnees</h4>
                <button type="button" class="btn btn-warning" onClick={() => setOption('Informatique')}>Informatique</button>
                <button type="button" class="btn btn-warning" onClick={() => setOption('Langues')}>Langues</button>
                <button type="button" class="btn btn-warning" onClick={() => setOption('Infographie')}>Infographie</button>
                <button type="button" class="btn btn-warning" onClick={() => setOption('Secretariat')}>Secretariat</button>
                <button type="button" class="btn btn-warning" onClick={() => setOption('Developpement Humain')}>Developpement Humain</button>
                <button type="button" class="btn btn-primary" onClick={() => setOption('')}>Tous</button>
            </div>
            <table className="table table-hover" id='table-list'>
                <thead className="thead-dark table-dark">
                    <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Option</th>
                        <th scope="col">Math</th>
                        <th scope="col">Physique</th>
                        <th scope="col">Science</th>
                        <th scope="col">Anglais</th>
                        <th scope="col">Francais</th>
                        <th scope="col">Stage</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studentsArray
                            .filter(val => {
                                if (option == "") return val;
                                else if (val.option.toLowerCase().includes(option.toLowerCase().trim())) return val;
                            })
                            .map((data, key) => (
                            <tr key={key}>
                                <td >{data.first_name}</td>
                                <td >{data.last_name}</td>
                                <td >{data.option}</td>
                                <td>{data.math}</td>
                                <td>{data.physique}</td>
                                <td >{data.science}</td>
                                <td >{data.anglais}</td>
                                <td >{data.francais}</td>
                                <td >{data.stage}</td>
                                <td><Link className="btn btn-secondary" to={"/edit"} state={{student: data}} >Modifier</Link></td>
                                <td><button className="btn btn-danger" onClick={() => handleItemDelete(data._id, data.first_name, data.last_name)}>Supprimer</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     );
}
 
export default HomePage;