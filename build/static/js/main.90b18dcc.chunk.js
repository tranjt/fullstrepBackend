(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),u=(t(20),t(14)),l=t(2),i=function(e){var n=e.personFilter,t=e.setPersonFilter;return a.a.createElement("div",null,"filter show with ",a.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}}))},s=function(e){var n=e.newName,t=e.setNewName,r=e.newNumber,o=e.setNewNumber,c=e.addPerson;return a.a.createElement("form",{onSubmit:c},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:r,onChange:function(e){return o(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.person,t=e.deletePerson;return a.a.createElement("div",null,n.name," ",n.number,a.a.createElement("button",{onClick:t},"delete"))},d=function(e){var n=e.persons,t=e.deletePerson;return n.map((function(e){return a.a.createElement("div",{key:e.name},a.a.createElement(m,{person:e,deletePerson:t(e)}))}))},f=function(e){var n=e.message;return null===n.text?null:a.a.createElement("div",{className:n.classname},n.text)},b=t(3),p=t.n(b),v="/api/persons",h=function(){return p.a.get(v).then((function(e){return e.data}))},E=function(e){return p.a.post(v,e).then((function(e){return e.data}))},w=function(e){return p.a.delete("".concat(v,"/").concat(e)).then((function(e){return e.data}))},N=function(e){return p.a.put("".concat(v,"/").concat(e.id),e).then((function(e){return e.data}))},j=function(){var e=Object(r.useState)(""),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)([]),m=Object(l.a)(c,2),b=m[0],p=m[1],v=Object(r.useState)(""),j=Object(l.a)(v,2),O=j[0],g=j[1],P=Object(r.useState)(""),k=Object(l.a)(P,2),C=k[0],L=k[1],x=Object(r.useState)({text:null,classname:""}),S=Object(l.a)(x,2),y=S[0],F=S[1];Object(r.useEffect)((function(){h().then((function(e){return p(e)}))}),[]);var A=function(e,n){F({text:e,classname:n}),setTimeout((function(){F({text:null,classname:""})}),5e3)},D=b.filter((function(e){return e.name.toLocaleLowerCase().includes(t.toLocaleLowerCase())}));return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(f,{message:y}),a.a.createElement(i,{personFilter:t,setPersonFilter:o}),a.a.createElement("h2",null,"Add a new"),a.a.createElement(s,{newName:O,setNewName:g,newNumber:C,setNewNumber:L,addPerson:function(e){e.preventDefault();var n=b.find((function(e){return e.name.toLocaleLowerCase()===O.toLocaleLowerCase()}));void 0===n?E({name:O,number:C}).then((function(e){p(b.concat(e)),g(""),L(""),A("Added ".concat(e.name),"success")})).catch((function(e){A(e.response.data.error,"error")})):window.confirm("".concat(O," is already added in phonebook, replace old number with new one?"))&&N(Object(u.a)({},n,{number:C})).then((function(e){p(b.map((function(t){return t.id!==n.id?t:e})))})).catch((function(e){e.response.data.error?A(e.response.data.error,"error"):(A("Information of ".concat(n.name," has already been removed from server"),"error"),p(b.filter((function(e){return e.id!==n.id}))))}))}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(d,{persons:D,deletePerson:function(e){return function(){if(window.confirm("Delete ".concat(e.name,"?"))){w(e.id);var n=b.filter((function(n){return n.id!==e.id}));p(n)}}}}))};c.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.90b18dcc.chunk.js.map