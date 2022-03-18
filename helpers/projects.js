
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const defaultProjectDataPath = '../data/projects.json';

// create the default data file, with starter json structure
let createDefaultData = () => {

    let defaultData = {
        projects: [],
    }

    fs.writeFileSync(path.resolve(__dirname, defaultProjectDataPath), JSON.stringify(defaultData));

}

// check if the default data file exists, if not create it
let checkIfProjectDataExists = () => {
    if(!fs.existsSync(path.resolve(__dirname, defaultProjectDataPath))){
        createDefaultData();
    }
    
}

// add the new project path to the user data json file
// expecting project path to be a string in the format of /Users/username/Documents/projectName
export let addNewProjectPath = (projectPath) => {

    checkIfProjectDataExists();

    let projectName = projectPath.split('/').pop();

    let newProject = {
        path: projectPath,
        name: projectName
    }
    
    fs.readFile(path.resolve(__dirname, defaultProjectDataPath), 'utf8', (err, data) => {
        if (err) throw err;

        let userData = JSON.parse(data);
        userData.projects.push(newProject);

        fs.writeFile(path.resolve(__dirname, defaultProjectDataPath), JSON.stringify(userData, null, 4), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    // TODO: Return a message that states sucessfully added the project or failed to add the project
}

// get the user data json file and return the list of projects
export let getProjects = async () => {
    //checkIfProjectDataExists();

    fs.readFileSync(path.resolve(__dirname, defaultProjectDataPath), 'utf8', (err, data) => {
        if (err) throw err;

        let userData = JSON.parse(data);

        return userData.projects.map(project => {
            return project.name;
        });
    });
}


// get the specific project path from the user data json file
export let getProjectPath = (projectName) => {
    checkIfProjectDataExists();

    fs.readFile(path.resolve(__dirname, defaultProjectDataPath), 'utf8', (err, data) => {
        if (err) throw err;

        let userData = JSON.parse(data);

        let projectPath = userData.projects.find(project => project.name === projectName).path;

        return projectPath;
    });
}