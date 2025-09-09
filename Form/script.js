const skillsContainer = document.getElementById('skillsContainer');
const skillsInput = document.getElementById('skillsInput');
const skillsSuggestions = document.getElementById('skillsSuggestions');
let skillsList = [];
const possibleSkills = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue', 'Node.js', 'Python', 'Java', 'C#', 'Ruby',
  'SQL', 'NoSQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'TypeScript', 'PHP', 'Swift'
];

function renderSkills() {
  // Remove all except input
  skillsContainer.querySelectorAll('.skill-tag').forEach(tag => tag.remove());
  // Add skill tags
  skillsList.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove ' + skill;
    // Set global removeSkill function for onclick
    removeBtn.setAttribute('onclick', `removeSkill('${skill.replace(/'/g, "\\'")}')`);
    tag.appendChild(removeBtn);
    skillsContainer.insertBefore(tag, skillsInput);
  });
}
function removeSkill(skill) {
  skillsList = skillsList.filter(s => s !== skill);
  renderSkills();
}
// Show suggestions matching input
function showSuggestions(value) {
  const val = value.trim().toLowerCase();
  if (val.length === 0) {
    skillsSuggestions.style.display = 'none';
    return;
  }
  const filtered = possibleSkills.filter(skill => skill.toLowerCase().startsWith(val) && !skillsList.includes(skill));
  if (filtered.length === 0) {
    skillsSuggestions.style.display = 'none';
    return;
  }
  skillsSuggestions.innerHTML = '';
  filtered.forEach(skill => {
    const div = document.createElement('div');
    div.textContent = skill;
    div.onclick = () => {
      skillsList.push(skill);
      renderSkills();
      skillsInput.value = '';
      skillsSuggestions.style.display = 'none';
    };
    skillsSuggestions.appendChild(div);
  });
  skillsSuggestions.style.display = 'block';
}
skillsInput.addEventListener('input', (e) => {
  showSuggestions(e.target.value);
});
skillsInput.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ',') && skillsInput.value.trim() !== '') {
    e.preventDefault();
    const newSkill = skillsInput.value.trim();
    if (!skillsList.includes(newSkill)) {
      skillsList.push(newSkill);
      renderSkills();
    }
    skillsInput.value = '';
    skillsSuggestions.style.display = 'none';
  } else if (e.key === 'Backspace' && skillsInput.value === '') {
    skillsList.pop();
    renderSkills();
  }
});

// location....................
const locationSearchInput = document.getElementById('locationSearchInput');
const locationCheckboxes = document.getElementById('locationCheckboxes');
const checkboxes = Array.from(locationCheckboxes.querySelectorAll('input[type="checkbox"]'));
locationSearchInput.addEventListener('input', () => {
  const val = locationSearchInput.value.trim().toLowerCase();
  checkboxes.forEach(checkbox => {
    const label = checkbox.parentElement;
    if (checkbox.value.toLowerCase().includes(val)) {
      label.style.display = '';
    } else {
      label.style.display = 'none';
    }
  });
});
function clearPreferredLocations() {
  checkboxes.forEach(cb => cb.checked = false);
  locationSearchInput.value = '';
  checkboxes.forEach(label => label.parentElement.style.display = '');
}
function clearPersonalDetails() {
  document.getElementById('jobApplicationForm').reset();
  clearPreferredLocations();
  skillsList = [];
  renderSkills();
}
// Copy page link
function copyPageLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied!');
}
// Scroll progress bar
window.addEventListener('scroll', function() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPosition = window.scrollY;
  const scrollPercent = (scrollPosition / totalHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});
// Scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById("scrollToTopBtn").style.display = "none";
}
// Show/hide scroll to top button
window.addEventListener("scroll", function() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (window.pageYOffset > 200) { 
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

document.querySelectorAll('form#jobApplicationForm label').forEach(label => {
  const forAttr = label.getAttribute('for');
  if (forAttr) {
    const input = document.getElementById(forAttr);
    if (input && (input.hasAttribute('required') || input.required)) {
      if (!label.textContent.trim().endsWith('*')) {
        label.textContent = label.textContent.trim() + ' *';
      }
    }
  }
});

// Form validation (unchanged)
document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let errors = [];
    const firstName = document.getElementById('firstName').value.trim();
    if (firstName === '') errors.push('First Name is required.');
    const lastName = document.getElementById('lastName').value.trim();
    if (lastName === '') errors.push('Last Name is required.');
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) errors.push('Enter a valid Email.');
    const contact = document.getElementById('contact').value.trim();
    if (contact === '' || !contact.match(/^[\d\+\-\s]+$/)) errors.push('Enter a valid Contact Number.');
    const gradYear = document.getElementById('graduationYear').value;
    if (!gradYear || gradYear < 1900 || gradYear > 2099) errors.push('Enter valid Graduation Year.');
    if (!document.getElementById('gender').value) errors.push('Select Gender.');
    if (!document.getElementById('experience').value) errors.push('Select Experience.');
    const employer = document.getElementById('employer').value.trim();
    if (employer === '') errors.push('Current Employer is required.');
    const currentCTC = document.getElementById('currentCTC').value.trim();
    if (!currentCTC.match(/^\d+(\.\d{1,2})?$/)) errors.push('Enter valid Current CTC.');
    const expectedCTC = document.getElementById('expectedCTC').value.trim();
    if (!expectedCTC.match(/^\d+(\.\d{1,2})?$/)) errors.push('Enter valid Expected CTC.');
    if (!document.getElementById('noticePeriod').value) errors.push('Select Notice Period.');
    // For skills check list
    if (skillsList.length === 0) errors.push('Enter at least one skill.');
    if (!document.getElementById('referral').value) errors.push('Select how you came across this vacancy.');
    const location = document.getElementById('location').value.trim();
    if (location === '') errors.push('Current Location required.');
    let preferred = document.querySelectorAll('input[name="preferredLocation"]:checked');
    if (preferred.length === 0) errors.push('Select at least one Preferred Location.');
    const resume = document.getElementById('resume').files[0];
    if (!resume) {
       errors.push('Resume is required.');
    } else {
       const allowed = ['pdf','doc','docx'];
       let ext = resume.name.split('.').pop().toLowerCase();
       if (!allowed.includes(ext)) errors.push('Resume must be a PDF, DOC, or DOCX.');
    }
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
    }
    // If no errors, allow submission
    this.submit();
});