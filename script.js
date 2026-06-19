// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});

// Miranda Rights Text
const mirandaRights = {
    'Délit mineur': `
        <p><strong>Monsieur {name}, nous sommes le {date}, {time}.</strong></p>
        <p><strong>Vous êtes en état d'arrestation pour : {delit}.</strong></p>
        <p>Vous avez le droit de garder le silence.</p>
        <p>Si vous renoncez à ce droit, tout ce que vous direz pourra être utilisé contre vous devant une cour de justice.</p>
        <p>La ville disposant d'un service d'avocat, vous pouvez demander la présence d'un avocat commis d'office.</p>
        <p><strong>Pendant votre détention, vous avez le droit à :</strong></p>
        <p>- des soins médicaux si nécessaire,<br>
           - de la nourriture,<br>
           - des boissons,<br>
           - un appel téléphonique d'une minute maximum.</p>
        <p><strong>**Avez-vous bien compris vos droits ?** (La réponse doit être claire et audible)</strong></p>
        <p><strong>**Souhaitez-vous exercer vos droits ?** (La réponse est obligatoire).</strong></p>
    `,
    'Délit majeur': `
        <p><strong>Monsieur {name}, nous sommes le {date}, {time}.</strong></p>
        <p><strong>Vous êtes en état d'arrestation pour : {delit}.</strong></p>
        <p>Vous avez le droit de garder le silence.</p>
        <p>Si vous renoncez à ce droit, tout ce que vous direz pourra être utilisé contre vous devant une cour de justice.</p>
        <p>La ville disposant d'un service d'avocat, vous pouvez demander la présence d'un avocat commis d'office.</p>
        <p><strong>Pendant votre détention, vous avez le droit à :</strong></p>
        <p>- des soins médicaux si nécessaire,<br>
           - de la nourriture,<br>
           - des boissons,<br>
           - un appel téléphonique d'une minute maximum,<br>
           - la présence d'un avocat lors de l'interrogatoire.</p>
        <p><strong>**Avez-vous bien compris vos droits ?** (La réponse doit être claire et audible)</strong></p>
        <p><strong>**Souhaitez-vous exercer vos droits ?** (La réponse est obligatoire).</strong></p>
    `,
    'Crime': `
        <p><strong>Monsieur {name}, nous sommes le {date}, {time}.</strong></p>
        <p><strong>Vous êtes en état d'arrestation pour : {delit}.</strong></p>
        <p>Vous avez le droit de garder le silence. Tout ce que vous direz pourra être utilisé contre vous devant une cour de justice.</p>
        <p>Vous avez le droit à la présence d'un avocat lors de vos interrogatoires. Si vous ne pouvez pas vous en payer un, un avocat vous sera commis d'office.</p>
        <p><strong>Pendant votre détention, vous avez le droit à :</strong></p>
        <p>- des soins médicaux immédiats si nécessaire,<br>
           - de la nourriture et des boissons régulièrement,<br>
           - des appels téléphoniques (limités),<br>
           - la présence de votre avocat à tout moment,<br>
           - une première comparution devant un juge dans les 72h.</p>
        <p><strong>**Avez-vous bien compris vos droits ?** (La réponse doit être claire et audible)</strong></p>
        <p><strong>**Souhaitez-vous exercer vos droits ?** (La réponse est obligatoire).</strong></p>
    `
};

// Get current date and time
function getFormattedDate() {
    const now = new Date();
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return {
        formatted: `${dayName} ${date} ${monthName} ${year}`,
        time: `${hours}h${minutes}`
    };
}

// Update Miranda Info
function updateMirandaInfo() {
    const playerName = document.getElementById('playerName').value || 'Suspect';
    const delit = document.getElementById('delit').value;
    const genre = document.getElementById('genre').value;
    
    const { formatted, time } = getFormattedDate();
    
    let text = mirandaRights[delit] || mirandaRights['Délit mineur'];
    text = text.replace('{name}', `${genre} ${playerName}`)
               .replace('{date}', `le ${formatted}`)
               .replace('{time}', time)
               .replace('{delit}', delit);
    
    document.getElementById('mirandaInfo').innerHTML = text;
}

// Form submission
document.getElementById('playerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    updateMirandaInfo();
});

// Form reset
document.getElementById('playerForm').addEventListener('reset', function() {
    setTimeout(() => updateMirandaInfo(), 0);
});

// Update on input change
document.getElementById('playerName').addEventListener('change', updateMirandaInfo);
document.getElementById('delit').addEventListener('change', updateMirandaInfo);
document.getElementById('genre').addEventListener('change', updateMirandaInfo);

// Sort button
document.getElementById('sortBtn').addEventListener('click', function() {
    const container = document.getElementById('codesContainer');
    const sections = [...container.querySelectorAll('.codes-section')];
    const isHidden = container.style.display === 'none';
    
    if (isHidden) {
        container.style.display = 'block';
        this.textContent = 'Trier par catégorie';
    } else {
        container.style.display = 'none';
        this.textContent = 'Afficher toutes les catégories';
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    updateMirandaInfo();
});
