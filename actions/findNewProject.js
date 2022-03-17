import inquirer from "inquirer";

import {search, generateSearchPath} from '../scripts/search.js';
import {addNewProjectPath} from '../helpers/userData.js';

let projectFound = false;
let projectPath = undefined

export let findNewProject = async () => {
    // while searching for the project, keep prompting user for input
    while(!projectFound){
        // get directory results from project Path
        let searchResults = projectPath ? await search(generateSearchPath(projectPath)) : await search();
        // break down results into variables
        let projects = searchResults.result;
        let directory = searchResults.directory;
        // map results to inquirer choices
        let projectChoices = projects.map(project => {
            return {
                name: project,
                value: project
            }
        });
        // add options to inquirer choices
        projectChoices.unshift({
            name: "This Directory " + directory,
            value: "this_directory"
        });
        // ask user for input
        await inquirer.prompt([
            {
                type: "list",
                name: "project",
                message: "What project would you like to work on?",
                choices: projectChoices
            }
        ]).then(function(answer) {
            // preform specific action based on user input
            if(answer.project === "this_directory"){
                projectPath = directory;
                projectFound = true
                addNewProjectPath(projectPath);
                
            } else {
                projectPath = projectPath ? projectPath.concat('/' + answer.project) : './Documents/' + answer.project;
                console.log(projectPath);
                
            }
        })
    }
}