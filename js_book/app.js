// const list = document.querySelector('#book-list ul');

// // delete books
// list.addEventListener('click', (e) => {
//   if(e.target.className == 'delete'){
//     const li = e.target.parentElement;
//     li.parentNode.removeChild(li);
//   }
// });


// var titles = document.getElementsByClassName('title');

// console.log(Array.isArray(titles)); // RES - false
// console.log(Array.isArray(Array.from(titles))); // RES - true 


// // TypeError: titles.forEach is not a function
// Array.isArray(titles).forEach(function(item){
// 	console.log(item);
// });


// const wmf = document.querySelector('#book-list li:nth-child(2) .name');
// var books = document.querySelector('#book-list li .name');


// Array.from(books).forEach(function(books){
// 	// change text of li
// 	book.textContent = 'test';

// 	// add test to each lines
// 	book.textContent += 'test';
// })


// const bookList = document.querySelector('#book-list');
// // bookList.innerHTML = '<h2>LALALALALAL</h2>'
// // bookList.innerHTML += '<p>LOOOO</p>'



// console.log('the parent node is:', bookList.parentNode)
// console.log('the parent elem is:', bookList.parentElement)

// console.log(bookList.childNodes) // все елементы
// console.log(bookList.children) // только дети первого уровня

// console.log(bookList.nextSibling)
// console.log(bookList.nextElementSibling)

// bookList.previousElementSibling.querySelector('p').innerHTML += '<br> Awesome' 


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// delete book
// var btns = document.querySelectorAll('#book-list .delete')

// // btns.addEventListene
// Array.from(btns).forEach(function(btn){
// 	btn.addEventListener('click', function(e){
// 		console.log(e.target)
// 		const li = e.target.parentElement;

// 		li.parentNode.removeChild(li)
// 	});
// });


// мы перенесли скрипт на самый вверх html и нужно прописать строку ниже.
document.addEventListener('DOMContentLoaded', function(){
	const list = document.querySelector('#book-list ul')
	list.addEventListener('click', function(e){
		if(e.target.className=='delete'){
			const li = e.target.parentElement;
			li.parentNode.removeChild(li);
		}
	});


	// add books-list
	const addForm = document.forms['add-book'];
	addForm.addEventListener('submit', function(e){
		e.preventDefault();
		const value = addForm.querySelector('input[type="text"]').value;

		// create elements
		const li = document.createElement('li');
		const bookName = document.createElement('span');
		const deleteBtn = document.createElement('span');

		// add content
		deleteBtn.textContent = 'delete';
		bookName.textContent = value;

		// add classes
		bookName.classList.add('name');
		deleteBtn.classList.add('delete');
		// bookName.setAttribute('class', 'name')


		// append to document
		li.appendChild(bookName);
		li.appendChild(deleteBtn);
		list.appendChild(li);
	});


	// hide books
	const hideBox = document.querySelector("#hide");
	hideBox.addEventListener('change', function(e){
		if(hideBox.checked){
			list.style.display='none';
		} else {
			list.style.display='initial'
		}
	});


	// filter  books
	const searchBar = document.forms['search-books'].querySelector('input');
	searchBar.addEventListener('keyup', function(e){
		const term = e.target.value.toLowerCase();
		const books = list.getElementsByTagName('li');
		Array.from(books).forEach(function(book){
			const title = book.firstElementChild.textContent;
			if(title.toLowerCase().indexOf(term) != -1) {
				book.style.display = 'block';
			} else {
				book.style.display = 'none';
			}
		});
	});


	// tabbed content
	const tabs = document.querySelector('.tabs');
	const panels = document.querySelectorAll('.panel');

	tabs.addEventListener('click', function(e){
		if(e.target.tagName =='LI'){
			const targetPanel = document.querySelector(e.target.dataset.target);
			panels.forEach(function(panel){
				if (panel == targetPanel) {
					panel.classList.add('active');
				} else {
					panel.classList.remove('active');
				}
			});
		}
	});
});

	