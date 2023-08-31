const tabContainer = document.getElementById('tab-container');


const tabLoader = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    tabCreator(data.data);
}

const tabCreator = (tabArray) => {

    tabArray.forEach(element => {
        const button = document.createElement('button');
        button.classList.add('btn', 'capitalize', 'rounded-[4px]');
        button.innerText = `${element.category}`;
        tabContainer.appendChild(button);
    })

    
    console.log(tabArray)
}

tabLoader();