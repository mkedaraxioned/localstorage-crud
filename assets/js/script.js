/* Author: 

*/
var firstname,lastname,address,male,female,terms;
var form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', validateForm);
var resetbtn=document.getElementsByClassName('resetbtn')[0];
var form_ip=document.getElementsByClassName('form-ip');


resetbtn.addEventListener('click',() =>{
    clearForm();
    selected_ul=null;
});
var all_persons=[];
var persons= {};
var inputs=['firstname','lastname','male','female','address','terms'];

var selected_ul=null;
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
    all_persons.push(person_to_add);
    // console.log('all perosons= '+all_persons.keys());
    localStorage.setItem('all_persons', JSON.stringify(all_persons));
    localStorage.setItem('all_persons1',all_persons);
    clearForm();
    showData();

}

function showData(){
    // [firstname,lastname,gender,address];
    // var data_to_add= {firstname,lastname,gender,address};
    var data_to_add;
    var person_prop =['firstname','lastname','gender','address'];
    if (localStorage.getItem('all_persons')) {
        data_to_add = JSON.parse(localStorage.getItem('all_persons'));
           
            data_to_add.forEach((person_print,person_prop) => {
                    const { firstname,lastname,gender,address } = person_print;
                    console.log(person_print.firstname);
                    for(var i=0;i<person_prop.length;i++)
                    {
                        console.log(person_print[person_prop[i]]);
                    }
                });    
            

                
      }
    //   console.log(data_to_add+" data_to_add.length="+data_to_add.length +'type of '+typeof(data_to_add));
    // for(var k=0;k<data_to_add.length;k++){
    //     var div_to_add=document.getElementsByClassName('personlist')[0];
    //     var ul_main= document.createElement('ul');
    //     var li_to_add=[];
        
        
    //     for(var i=0;i<data_to_add.length;i++) {
    //         for(var j=0;j<6;j++) {
    //               li_to_add[j]= document.createElement('li');
    //          }
    //          for(var l=0;l<person_prop.length;l++) {
    //              var span_to_add=document.createElement("span");
    //                  span_to_add.innerHTML=data_to_add[0].firstname;
    //                 //  console.log("fir"+all_persons[0].firstname);
    //                  li_to_add[i].appendChild(span_to_add);
    //          }
    //          li_to_add[4].innerHTML='<button onClick="rowEdit(this)">Edit</button>';
    //          li_to_add[5].innerHTML='<button onClick="rowDelete(this)">Delete</button>';
    //          for(var m=0;m<6;m++){ 
    //          ul_main.appendChild(li_to_add[m]);
    //          }
    //          div_to_add.appendChild(ul_main);
             
            
    //     }
    
    
    
    // }

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
    // selected_ul.childNodes[0].childNodes[0].innerHTML=form_ip[0].value;
    // selected_ul.childNodes[1].childNodes[0].innerHTML=form_ip[1].value;
    // selected_ul.childNodes[3].childNodes[0].innerHTML=form_ip[4].value;    
    if(form_ip[2].checked){
        selected_ul.childNodes[2].childNodes[0].innerHTML="Male";
    }
    else if(form_ip[3].checked)
    {
        selected_ul.childNodes[2].childNodes[0].innerHTML="Female";
    }
    selected_ul = 1;
    }

}

function rowDelete(sel_span) {
    if (confirm('Delete this person')) {
        var remove_ul = sel_span.parentElement.parentElement;
        remove_ul.remove();
        clearForm();
    }
}























