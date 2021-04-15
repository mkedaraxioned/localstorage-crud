/* Author: 

*/
var firstname,lastname,address,male,female,terms;
var form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', validateForm);
var resetbtn=document.getElementsByClassName('resetbtn')[0];
var form_ip=document.getElementsByClassName('form-ip');

window.addEventListener("load",showData(0));

resetbtn.addEventListener('click',() =>{
    clearForm();
    selected_ul=null;
});
var all_persons=[];
var persons= {};
var inputs=['firstname','lastname','male','female','address','terms'];

var selected_ul=null;
var sel_ul_localstorage;
function validateForm(event) {
    event.preventDefault();
    if(selected_ul!=null) {
        rowEditSubmit();
    }
    
    for(var i = 0 ; i < inputs.length; i++)
    {   
        if(i===2||i===3||i===5)
        {
            persons[inputs[i]]=form_ip[i].checked;
            continue;
        }
        persons[inputs[i]]=form_ip[i].value;

    }
  
    var formFlag=0;

    for(var i = 0 ; i < inputs.length; i++)
    {   
        if(i===2||i===3||i===5)
        continue;
        if(persons[inputs[i]]=="")
        {
            alert("Please enter "+inputs[i]);
            formFlag=1; 
        }
    }
     
          if((!persons['male'])&&(!persons['female']))
          {
              alert("Please Choose gender");
              formFlag=1; 
          }      

      if(!persons['terms']){
        alert("Please Accept terms and Conditions by selecting checkbox");
        formFlag=1;
      }

      if(formFlag===0) 
      {
        alert("Thank you");
        if(persons['male'])
        {
            gender="Male";
        }
        else if (persons['female'])
        {
            gender="Female";
        }
        if(selected_ul==null){
            insertData([persons['firstname'],persons['lastname'],gender,persons['address']]);
        }

      }

  }

function insertData(data_to_add) {
    // [firstname,lastname,gender,address];
    console.log(data_to_add);


    var person_prop =['firstname','lastname','gender','address'];
    var person_to_add = {};
    for(var i=0;i<data_to_add.length;i++)
    {
        person_to_add[person_prop[i]]=data_to_add[i];
    }
    // console.log('all perosons= '+all_persons.keys());
    if (localStorage.getItem('all_persons')) {
        all_persons = JSON.parse(localStorage.getItem('all_persons')); 
        all_persons.push(person_to_add);
        localStorage.setItem('all_persons', JSON.stringify(all_persons));
    } 
    else {
        all_persons.push(person_to_add);
        localStorage.setItem('all_persons', JSON.stringify(all_persons));
  
    } 
    // localStorage.setItem('all_persons1',all_persons);
    clearForm();
    var insertflag=1;
    showData(insertflag);
    insertflag=0;

}

function showData(insertflag){
    // [firstname,lastname,gender,address];
    // var data_to_add= {firstname,lastname,gender,address};
    var data_to_add;
    if (localStorage.getItem('all_persons')) {  
        data_to_add = JSON.parse(localStorage.getItem('all_persons'));
        var div_to_add=document.getElementsByClassName('personlist')[0];
        if(insertflag){
            div_to_add.querySelectorAll('*').forEach(n => n.remove());
        }
        
        
        data_to_add.forEach((person_print) => {
          const { firstname,lastname,gender,address } = person_print;

            var person_prop =['firstname','lastname','gender','address'];
            // creation of ul and li
            var ul_main= document.createElement('ul');
             var li_to_add=[];
            for(var i=0;i<6;i++) {
             li_to_add[i]= document.createElement('li');
            }

                    for(var i=0;i<person_prop.length;i++)
                    {
                        // console.log("l"+person_print[person_prop[i]]);
                        var span_to_add=document.createElement("span");
                        span_to_add.innerHTML=person_print[person_prop[i]];
                        li_to_add[i].appendChild(span_to_add);
                    }
                    li_to_add[4].innerHTML='<button onClick="rowEdit(this)">Edit</button>';
                    li_to_add[5].innerHTML='<button onClick="rowDelete(this)">Delete</button>';
                    for(var i=0;i<6;i++){ 
                        ul_main.appendChild(li_to_add[i]);
                        }
                        div_to_add.appendChild(ul_main);
              
                });                    
      }


}

function clearForm() {
    for(var i = 0 ; i < inputs.length; i++)
    {   
        if(i===2||i===3||i===5){
            form_ip[i].checked=false;
            continue;
        }
        form_ip[i].value="";        
    }
    selected_ul = null;
}

function rowEdit(sel_span) {
    selected_ul = sel_span.parentElement.parentElement;
    sel_ul_localstorage=selected_ul;
    var form_seq=[0,1,4],li_seq=[0,1,3];
    for(var i=0;i<form_seq.length;i++)
    {
        form_ip[form_seq[i]].value = selected_ul.childNodes[li_seq[i]].childNodes[0].innerHTML;        
    }

    if(selected_ul.childNodes[2].childNodes[0].innerHTML=="Male"){
        form_ip[2].checked = true;
    }
    else if(selected_ul.childNodes[2].childNodes[0].innerHTML=="Female")
    {
        form_ip[3].checked = true;
    }
    form_ip[5].checked = true;


   


   
}


function rowEditSubmit() {
    var editflag=1;
    for(var i = 0 ; i < inputs.length; i++)
    {   
        if(form_ip[i].value=="")
        editflag=0;
    }
    if(editflag===1){
        var form_seq=[0,1,4],li_seq=[0,1,3];
        for(var i=0;i<form_seq.length;i++)
        {
            selected_ul.childNodes[li_seq[i]].childNodes[0].innerHTML=form_ip[form_seq[i]].value;
        }    

    if(form_ip[2].checked){
        selected_ul.childNodes[2].childNodes[0].innerHTML="Male";
    }
    else if(form_ip[3].checked)
    {
        selected_ul.childNodes[2].childNodes[0].innerHTML="Female";
    }
    selected_ul = 1;
    }

    
    var edit_fname=sel_ul_localstorage.firstChild.firstChild;
    var edit_lname=edit_fname.parentElement.nextSibling.firstChild;
    var edit_gender=edit_lname.parentElement.nextSibling.firstChild;
    var edit_address=edit_gender.parentElement.nextSibling.firstChild;
    var all_edit_values=[edit_fname,edit_lname,edit_gender,edit_address];
    console.log("edit_lname= "+edit_lname.innerHTML);
    console.log("edit_gender= "+edit_gender.innerHTML);
    console.log("edit_address= "+edit_address.innerHTML);
    // break;
    // var edit_gender=sel_span.parentElement.parentElement.find(':nth-child(2)').firstChild.innerHTML;
    // var edit_address=sel_span.parentElement.parentElement.find(':nth-child(3)').firstChild.innerHTML;    

    // var edit_fname=sel_span.parentElement.parentElement.find     .firstChild.innerHTML;
    var person_prop =['firstname','lastname','gender','address'];
    console.log("edit fname= "+edit_fname.innerHTML);
    all_persons = JSON.parse(localStorage.getItem('all_persons')); 
    console.log("type of all person ="+typeof(all_persons));
    // var current_form_ip=document.querySelectorAll('form-ip');
    all_persons.forEach((person, i) => {
        if (person.firstname === edit_fname.innerHTML) {
            for(var j=0;j<person_prop.length;j++){                
                    person[person_prop[j]]=all_edit_values[j].innerHTML;                
            }
        }
    });
    localStorage.setItem('all_persons', JSON.stringify(all_persons));

}

function rowDelete(sel_span) {
    if (confirm('Delete this person')) {
        var remove_fname=sel_span.parentElement.parentElement.firstChild.firstChild.innerHTML;
        console.log("remove fname= "+remove_fname);
        all_persons = JSON.parse(localStorage.getItem('all_persons')); 
        console.log("type of all person ="+typeof(all_persons));
        all_persons.forEach((person, i) => {
            console.log("type of person"+typeof(person));
            if (person.firstname === remove_fname) {
                all_persons.splice(i, 1);
            }
        });
        localStorage.setItem('all_persons', JSON.stringify(all_persons));
        
        var remove_ul = sel_span.parentElement.parentElement;
        remove_ul.remove();
        clearForm();
    }
}























