import './js/components';
import './bulma.css';


// REFERENCES TO HTML
const tagsElement = document.querySelector('#tags');
const repeatContainer = document.querySelector('#repeat-container')
const textarea = document.querySelector('#textarea');
const warnTags = document.querySelector('#warn-tags');
const warnRepeat = document.querySelector('#warn-repeat');
const result = document.querySelector('#result');
const modal = document.querySelector('#modal');
const btnNew = document.querySelector('#btn-new');
const btnMobile = document.querySelector('#btn-mobile');
let count = document.querySelector('#count');
const mainTitle = document.querySelector('#main-title');
const deskTitle = document.querySelector('#desk-title');
const modalHeader = document.querySelector('#modal-header');
const modalCard = document.querySelector('#modal-card');
const modalFooter = document.querySelector('#modal-footer');
const darkModeToggle = document.querySelector('#mode-icon');

// HERE GOES THE TAGS CREATED
let tags = [];

// IF THERE ARE REPEATED ELEMENTS, THEY GOES HERE
let repeatItems = [];



// TO COUNT THE NUMBER OF TAGS
count.innerHTML = `0 tags`;

const setCountValue = (tags) => {

    if (tags.length === 1) {
        count.innerHTML = `${tags.length} tag`
    } else {
        count.innerHTML = `${tags.length} tags`
    }

}



// TO PLACE THE CURSOR AUTOMATICALLY INSIDE OF TEXTAREA AND CLEAN IT
const textareaReset = () => {

    textarea.value = '';
    textarea.focus();
    warnRepeat.classList.add('is-hidden');

}

textareaReset();



// TO REMOVE WARNS
const clearWarns = () => {
    warnRepeat.classList.add('is-hidden');
    warnTags.classList.add('is-hidden');
}



// TO REMOVE TAGS WITH CLOSE BUTTON
const removeTag = (btnClose) => {

    btnClose.addEventListener('click', (event) => {

        const deleteTagValue = event.target.parentElement.innerText;

        let indexElement = tags.indexOf(deleteTagValue);

        tags.splice(indexElement, 1);
        textarea.value = tags.join('.');

        tagsElement.innerHTML = '';
        createTagElement(tags, false);
        setCountValue(tags);
        
        if (tags.length === 0) {warnTags.classList.add('is-hidden');}

        repeatContainer.innerHTML = '';
        warnRepeat.classList.add('is-hidden');
        showRepeated();

    });

}



// TO DISABLE BUTTON REMOVE WHEN RANDOM CHOICE STARTS
const removeBtnClose = () => {
 
    const buttonsClose = document.querySelectorAll('.delete');
    
    buttonsClose.forEach(button => {
    
        button.classList.add('is-hidden');

    })

}



// THIS FUNCTION CREATE TAG ELEMENTS
const createTagElement = (tags, isRepeated) => {

    tags.forEach(tag => {

        // HTML elements are created     
        const tagElement = document.createElement('span');
        const btnClose = document.createElement('button');
        tagElement.classList.add('tag', 'px-4', 'm-2');
        btnClose.classList.add('delete', 'ml-4');
        tagElement.innerText = tag;
        tagsElement.appendChild(tagElement);
        
        removeTag(btnClose);
        
        // to create repeated tags
        if (isRepeated) {
            
            tagElement.classList.add('is-danger', 'has-text-white');
            repeatContainer.appendChild(tagElement);
            
        } else {
            tagElement.classList.add('has-background-grey-lighter', 'has-text-black');
            tagElement.appendChild(btnClose);
        }

    });

}



// THIS FUNCTION GENERATE TAGS
const generateTags = (input) => {

    tags = input.split('.').filter(tag => tag.trim() !== '').map(tag => tag.trim());
    // return the tags without empty spaces(.trim()) and not equal to empty strings(! == '')
    
    setCountValue(tags);

    tagsElement.innerHTML = '';
    warnTags.classList.add('is-hidden');

    createTagElement(tags, false);

    repeatContainer.innerHTML = '';
    warnRepeat.classList.add('is-hidden');

    showRepeated();

}



// THIS FUNCTION VALIDATES IF THERE ARE REPEATED ELEMENTS
const repeatValidate = (value, index, tags) => {

    return !(tags.indexOf(value) === index);
    // this function is validated with tags.some(repeatValidate)
}



// THIS FUNCTION CREATES AN ARRAY OF REPEATED TAGS
const showRepeated = () => {

    const tempArray = [...tags].sort();
    repeatItems = [];
    btnMobile.removeAttribute('disabled');

    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i + 1] === tempArray[i]) {

            repeatItems.push(tempArray[i]);
            warnTags.classList.add('is-hidden');
            warnRepeat.innerHTML = `
            <div class="icon-text">
                <span class="icon has-text-danger-dark">
                    <i class="fas fa-ban"></i>
                </span>
                <span class="is-size-7-mobile is-size-5-tablet">There are repeated elements</span>
            </div>`;

            warnRepeat.classList.remove('is-hidden');
            btnMobile.setAttribute('disabled', true);

        }
    }

    createTagElement(repeatItems, true);

}



// THIS FUNCTION IS PART OF VALIDATION OF REPEATED TAGS
const validateTags = () => {

    btnMobile.removeAttribute('disabled');
    repeatContainer.innerHTML = '';

    if (tags.length > 1) {

        (tags.some(repeatValidate) === false) ? choicePicker() : showRepeated();

        repeatItems = [];

        btnMobile.setAttribute('disabled', true);

    } else {

        warnRepeat.classList.add('is-hidden');
        warnTags.innerHTML = `
        <div class="icon-text">
            <span class="icon has-text-warning-dark">
                <i class="fas fa-exclamation-triangle"></i>
            </span>
            <span class="is-size-7-mobile is-size-5-tablet">There must be at least <b>2 tags</b></span>
        </div>`;

        warnTags.classList.remove('is-hidden');
        btnMobile.setAttribute('disabled', true);

    }

}



// EVENTS 
// TO CONFIRM TAGS
textarea.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

        event.preventDefault();
        clearWarns();

    }

});



textarea.addEventListener('keyup', (event) => {

    repeatItems = [];
    generateTags(event.target.value);

    if (event.key === 'Enter') {

        validateTags();

    }

});



// RANDOM SELECT PROCESS
const pickRandomTag = () => {

    const tags = document.querySelectorAll('.tag');

    return tags[Math.floor(Math.random() * tags.length)];

}



const randomSelect = () => {

    const times = 80;

    const interval = setInterval(() => {

        const randomTag = pickRandomTag();

        highlightTag(randomTag);

        setTimeout(() => {

            unHighlightTag(randomTag);

        }, 100);

    }, 100);


    setTimeout(() => {

        clearInterval(interval);

        setTimeout(() => {

            const randomTag = pickRandomTag();
            highlightTag(randomTag);
            const winner = randomTag.innerText;

            setTimeout(() => {

                result.innerText = winner;
                modal.classList.add('is-active');

            }, 1000);

        }, 100);

    }, times * 100);

}



// THIS FUNCTION PICKS ONE CHOICE RANDOMLY
const choicePicker = () => {

    clearWarns();
    removeBtnClose();

    setTimeout(() => {
        textareaReset();
        textarea.setAttribute('disabled', true);
    }, 10);

    setTimeout(() => {
        randomSelect();
    }, 1000);

}



// HIGHLIGHT TAGS
const highlightTag = (tag) => {

    tag.classList.remove('has-background-grey-lighter');
    tag.classList.remove('has-text-black');
    tag.classList.add('is-success');
    tag.classList.add('has-text-white');

}



// UNHIGHLIGHT TAGS
const unHighlightTag = (tag) => {

    tag.classList.add('has-background-grey-lighter');
    tag.classList.add('has-text-black');
    tag.classList.remove('is-success');
    tag.classList.remove('has-text-white');

}



// BUTTON NEW RANDOM 
btnNew.addEventListener('click', () => {
    tags = [];
    tagsElement.innerHTML = '';
    modal.classList.remove('is-active');
    textarea.removeAttribute('disabled');
    btnMobile.removeAttribute('disabled');
    textareaReset();
    count.innerHTML = `0 tags`;
});



// BUTTON FOR MOBILE DEVICES
btnMobile.addEventListener('click', () => {
    repeatItems = [];
    validateTags();
});



// THIS FUNCTION ADD OR REMOVE THE DARK-MODE CLASS
const changeMode = () => {

    document.body.classList.toggle('dark-mode');
    mainTitle.classList.toggle('dark-mode');
    deskTitle.classList.toggle('dark-mode');
    textarea.classList.toggle('dark-mode');
    modalHeader.classList.toggle('dark-mode');
    modalCard.classList.toggle('dark-mode');
    modalFooter.classList.toggle('dark-mode');

}



// SET USER COLOR MODE PREFERENCE IN LOCAL STORAGE 
const localConfig = localStorage.getItem('mode');

if (localConfig === 'dark') {

    changeMode();

} 



// DARK MODE TOGGLE
darkModeToggle.addEventListener('click', () => {

    let colorMode;

    if (document.body.classList.contains('dark-mode')) {

        changeMode();
        colorMode = 'light';

    } else {
        
        changeMode();
        colorMode = 'dark';
    
    }

    localStorage.setItem('mode', colorMode);

});
