const tabContainer = document.getElementById('tab-container');
const cardContainer = document.getElementById('card-container');
const sortButton = document.getElementById('sort-1000');

const tabLoader = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    tabCreator(data.data);
}

const tabCreator = (tabArray) => {

    tabArray.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id= '${element.category_id}' class= "btn capitalize rounded-[4px] button-tab text-lg" onclick="tabChange(this); buttonColor(this)">${element.category}</button>
        
        `
        tabContainer.appendChild(div);
    })
    cardLoader(1000);
    document.getElementById('1000').classList.add('active');
}

const cardLoader = async (id, clicked) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    if(data.status === true){
        cardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6');
        cardCreator(data.data, clicked);
    }
    else{
        cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6');
        cardContainer.classList.add('flex', 'justify-center', 'items-center');
        cardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center md:my-[150px] my-24">
        <div><img src="images/icon.png" alt=""></div>
        <h2 class="align-center md:text-[32px] text-2xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
      </div>
        
        
        `
    }

}

const cardCreator = (cardArray, clicked) => {
    
    if(clicked){
        cardArray = cardArray.sort((a, b) => {
        const viewsNumberA = parseFloat((a.others.views.slice(0, length-1))*1000);
        const viewsNumberB = parseFloat((b.others.views.slice(0, length-1))*1000);
      
        return viewsNumberB - viewsNumberA;
      } );
      
    }
    
    cardArray.forEach(card => {
        const div = document.createElement('div');
        div.classList.add("w-[312px]", "lg:max-[1360px]:w-[24vw]");
        div.innerHTML= `
        <div class="w-[312px] lg:max-[1360px]:w-[24vw]">
          <div class="relative"><img class="w-[312px] lg:max-[1360px]:w-[24vw] h-[200px] rounded-lg object-cover mb-5" src=${card?.thumbnail} alt="">
          ${card?.others?.posted_date?`<div class="absolute bottom-3 right-3 text-white z-10 bg-mainColor p-1 text-[10px] rounded-[4px]"><span>${Math.floor(((card?.others?.posted_date)/60)/60)}</span>hrs <span>${Math.floor(((card?.others?.posted_date)/60)%60)}</span> min ago</div>`:``}
          
          </div>
          <div class="flex gap-3">
            <div><img class="w-10 h-10 object-cover rounded-[40px]" src=${card?.authors[0]?.profile_picture} alt=""></div>
            <div class="w-[260px]">
              <h3 class="font-bold">${card?.title}</h3>
              <div class="flex gap-2">
                <h5 class="opacity-70 my-2">${card?.authors[0]?.profile_name}</h5>
                <img ${card?.authors[0]?.verified?'src="images/tick.svg"':""} alt="">
              </div>
              <h5 class="opacity-70">${card?.others?.views} views</h5>
            </div>
          </div>
        </div>
        `;
        cardContainer.appendChild(div);


    })

}

tabLoader();

const tabChange = (target) => {
    cardContainer.innerHTML = "";
    cardLoader(target.id);
    sortButton.id=`sort-${target.id}`; 

}

const sortMethod = (target) => {
  cardContainer.innerHTML = "";
  const targetId = target.id.split('-')[1];
  cardLoader(targetId, true);
}

const openUrl = () => {
  window.location.href = "blog.html";
}

const buttonColor = (target) => {
  const buttons = document.querySelectorAll('.button-tab');
  buttons.forEach(button => {
    button.classList.remove('active');
  })
  target.classList.add('active');
}