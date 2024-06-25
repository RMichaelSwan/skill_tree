class Skill {
    id;
    description;
    level;
    prereqs;
    fields;
    link;
    img;

    constructor(id,description,level,prereqs,fields,link,img) {
        this.id = id;
        this.description = description;
        this.level = level;
        this.prereqs = prereqs;
        this.fields = fields;
        this.link = link;
        this.img = img;
      }
}
const maxLevel = 7;
let skills = new Map();
skills.set('breadboard',new Skill('breadboard','Learn to use a breadboard',1,[],['electrical', 'mechanical', 'software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image1.jpg'))
skills.set('led', new Skill('led','Blink an LED',1,['breadboard'],['electrical', 'mechanical', 'software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image2.jpg'))
skills.set('button', new Skill('button','Use a button or a switch in a circuit',1,['breadboard'],['electrical', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image3.jpg'))
skills.set('ohm', new Skill('ohm','Learn Ohm\'s Law',1,[],['electrical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('draw', new Skill('draw','Create an isometric drawing of a part on paper',1,[],['mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

skills.set('smoke', new Skill('smoke','Let the smoke out of a dev board accidentally',2,[],['electrical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('cad', new Skill('cad','Design two parts that fit together in TinkerCAD',2,['draw'],['mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('bug', new Skill('bug','Fix a difficult coding bug',2,['led'],['software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('circuit', new Skill('circuit','Fix an issue in your electrical circuit',2,['led','ohm'],['electrical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

skills.set('detect', new Skill('detect','Detect a person with a sensor',3,['breadboard', 'led'],['electrical', 'software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('sim-board', new Skill('sim-board','Use TinkerCad to code and simulate a project',3,['breadboard', 'led'],['electrical', 'software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('print', new Skill('print','3D print something you designed',3,['cad'],['mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('break', new Skill('break','Break a mechanical part you made',3,['cad'],['mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

skills.set('art', new Skill('art','Make an interactive art piece with a dev board',4,['detect'],['electrical', 'software', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('cam', new Skill('cam','Make a project with a camera',4,['detect'],['electrical', 'software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

skills.set('robot', new Skill('robot','Do an autonomous robotics project',5,['art'],['electrical', 'software', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('pcb', new Skill('pcb','Design your own custom PCB',5,['art'],['electrical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

skills.set('legged', new Skill('legged','Build a legged robot from scratch',6,['robot'],['electrical', 'software', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('quadcopter', new Skill('quadcopter','Build a quadcopter from scratch',6,['robot'],['electrical', 'software', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))


skills.set('re_vision', new Skill('re_vision','Develop new SLAM algorithm',7,['robot'],['software'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('re_bio', new Skill('re_bio','Design and build a new bio-mimetic robot',7,['robot'],['software', 'electrical', 'mechanical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))
skills.set('re_embed', new Skill('re_embed','Design a more efficient motor controller',7,['pcb'],['software','eletrical'],'https://docs.ros.org/en/jazzy/Tutorials.html','path/to/image4.jpg'))

const paths = {
    mechanical: ['breadboard','draw','cad','print', 'art','robot','legged','re_bio'],
    electrical: ['breadboard', 'led', 'button', 'ohm','smoke','detect','sim-board','pcb','quadcopter','re_embed'],
    software: ['led', 'button','bug','detect','cam','robot','legged','re_vision'],
};



document.addEventListener('DOMContentLoaded', () => {
    const skillTree = document.getElementById('skillTree');
    skills.forEach(skill => {
        const div = document.createElement('div');
        div.classList.add('skill');
        div.id = skill.id;
        // Calculate grid row start to achieve honeycomb layout
        const rowOffset = maxLevel - skill.level; // Row offset based on skill level
        // const colOffset = rowOffset % 2 === 0 ? 0 : 1; // Column offset for odd/even rows
        const gridRow = rowOffset + 1;
        div.style.gridRow = gridRow; // Adjust row start
        if (gridRow % 2 == 0) {
            div.classList.add('skill-offset');
        }

        // const img = document.createElement('img');
        // img.src = skill.image;
        // div.appendChild(img);

        const text = document.createElement('div');
        text.className = 'skill-text'; // Added a class for text element
        text.innerText = skill.description;
        div.appendChild(text);
        // div.appendChild(border);

        div.onclick = () => window.location.href = skill.link;
        div.onmouseover = () => highlightSkill(skill.id);
        div.onmouseout = () => clearHighlight();
        skillTree.appendChild(div);
    });

    setTimeout(() => {
        skills.forEach(skill => {
            const skillElement = document.getElementById(skill.id);
            const textElement = skillElement.querySelector('.skill-text');
            const fontSize = calculateFontSize(skillElement);
            textElement.style.fontSize = fontSize;
        });
    }, 0);
});

function calculateFontSize(skillElement) {
    // Calculate font size based on skillElement dimensions
    const skillWidth = skillElement.clientWidth; // Use clientWidth for inner dimensions
    const skillHeight = skillElement.clientHeight; // Use clientHeight for inner dimensions
    const maxTextWidth = skillWidth*2;
    const maxTextHeight = skillHeight;

    // Initial font size
    let fontSize = 14; // px

    // Adjust font size based on width and height constraints
    if (maxTextWidth < skillElement.innerText.length * fontSize ||
        maxTextHeight < fontSize) {
        fontSize = Math.min((maxTextWidth) / (skillElement.innerText.length), maxTextHeight);
    }

    fontSize = Math.max(fontSize, 8); // Ensure minimum font size of 8px

    return fontSize + 'px'; // Return font size in pixels
}

function highlightSkill(skillId) {
    clearHighlight();
    const skill = skills.get(skillId);
    if (!skill) return;

    highlightPrereqs(skill);
    document.getElementById(skillId).classList.add('highlight-skill');
}

function highlightPrereqs(skill) {
    skill.prereqs.forEach(prereqId => {
        const prereqskill = skills.get(prereqId);
        if (prereqskill) {
            document.getElementById(prereqId).classList.add('highlight-prereq');
            highlightPrereqs(prereqskill);
        }
    });
}

function clearHighlight() {
    document.querySelectorAll('.highlight-skill, .highlight-prereq').forEach(el => {
        el.classList.remove('highlight-skill', 'highlight-prereq');
    });
}

function highlightPath(path) {
    clearHighlight();
    paths[path].forEach(skillId => {
        document.getElementById(skillId).classList.add('highlight-skill');
    });
}

function filterSkills(field) {
    skills.forEach(skill => {
        const skillElement = document.getElementById(skill.id);
        if (field === 'all' || skill.fields.includes(field)) {
            skillElement.classList.remove('hidden');
        } else {
            skillElement.classList.add('hidden');
        }
    });
}
