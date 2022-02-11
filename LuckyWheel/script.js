(()=>{
    const $ = document.querySelector.bind(document);

    let timer = 7000;
    let isRotating = false;
    let currentRotate = 0;
    const wheel = $('.wheel');
    const btnStart = $('.play');
    const msg = $('.msg');
    const openbtn = $('.openbtn');
    const closebtn = $('.closebtn');
    const mySidenav = $('#mySidenav');
    const changebtn = $('.changebtn');
    const addfield = $('.addfield');

    const fieldtext = $('.textfield');
   var listGift = [
       {
           txtName:'1',
           percent:1/4
       },
       {
        txtName:'2',
        percent:1/4
         },
        {
        txtName:'3',
        percent:1/4
        },
        {
        txtName:'4',
        percent:1/4
        },

      
      
    ];

   


    const renderItem = () => {
        const size = listGift.length;
        const rotate = 360/size; //so phan chiem cua 1 item
        const skewY = 90 - rotate; //Do nghieng cua 1 item
        wheel.innerHTML="";
        fieldtext.innerHTML="";
        listGift.forEach( (item, index) => {
      
           
            const itemGift = document.createElement(tagName='li');
           
            var randomColor = Math.floor(Math.random()*16777215).toString(16);


            itemGift.style.transform = `
                 rotate(${rotate * index}deg)
                 skewY(-${skewY}deg)
             `;

            itemGift.innerHTML = `
                <p class="text-item ${index % 2 == 0 && 'even'}"
                 style="transform: skewY(${skewY}deg)
                    rotate(${rotate / 2}deg) ; background-color: #${randomColor}"
                >
                    <b>${item.txtName}</b>
                </p>
            `;

        wheel.appendChild(itemGift);
     
      
        const inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = item.txtName;
     
        fieldtext.appendChild(inputName);

        });
    };
    
    const rotatewheel = (currentRotate, index) => {
        const size = listGift.length;

        const rotate = 360/size; //so phan chiem cua 1 item

        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2 }deg)`;
        };

    const getGift = randomNumber => {
        
        let currentPercent = 0;
        let list = [];
        listGift.forEach((item, index) => {
            currentPercent += item.percent;

            console.log("Curent percent:" + currentPercent);
            randomNumber <= currentPercent &&
                 list.push({
                     ...item,
                     index,
                 });

                 console.log(randomNumber);

        });
        console.log(list);
        return list[0];
    };
    const showTxtGift = txt =>{
    setTimeout (() =>{
         isRotating = false;
         msg.innerHTML = `${txt}`;
        }, timer);
    };

    const start = () => {
        isRotating = true;
        msg.innerHTML = '';
        const random = Math.random();
        const gift = getGift(random);
        
        currentRotate += 360 * 10;
        rotatewheel(currentRotate, gift.index);
        showTxtGift(gift.txtName);

        console.log(currentRotate,gift.index)
    };

    btnStart.addEventListener('click', () => {
        !isRotating && start();
    });

    
    renderItem();
    closebtn.addEventListener('click', () => {
        $("#mySidenav").style.width = "0";
    })
  
    openbtn.addEventListener('click', () => {
        $("#mySidenav").style.width = "250px";
    })

    changebtn.addEventListener('click', (e) => {
        const field = document.querySelectorAll('input[type=text]');
        const newValue = document.querySelectorAll('b');

       
        listGift.forEach( (item, index) => {
            item.txtName = field[index].value;  
            item.percent = 1 / field.length;         
        })
        
        newValue.forEach((item, index) => {
            item.innerHTML = listGift[index].txtName;   
        })
    })

    addfield.addEventListener('click' , (e) => {

     
        listGift.push(
            {
              txtName:"0",
                percent:1/(listGift.length +2),
            },
            {
                txtName:"0",
              percent:1/(listGift.length+2),
              }
        );
        listGift.map(function(item) {
            item.percent = 1/listGift.length;
        })

    
        renderItem();
       
    })
})();

  

  