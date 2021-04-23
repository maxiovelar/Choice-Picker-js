import '../css/components.css';


export const welcome = (name) => {

    const h1 = document.createElement('h1');
    h1.innerText = `Welcome ${name}`;

    document.body.append(h1);
    
}