const dropdown = document.querySelector('.dropdown')
if(dropdown){
	dropdown.addEventListener('click',(e)=>{
	dropdown.children[1].classList.toggle('show')
	})	
}

