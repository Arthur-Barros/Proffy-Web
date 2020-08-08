import React, { useState, FormEvent } from "react";
import  {useHistory} from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function TeacherForm(){

    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from:"" , to:"" }
    ]);

    function addNewSchudleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from:"" , to:"" }
        ]);

        scheduleItems.push()
    }


    function setScheduleItemvalue(postion: number, field: string, value: string){
        const upadteScheduleItems= scheduleItems.map((scheduleItem,index) =>{
            if( index === postion){
                return {...scheduleItem,[field]: value};
            }

            return scheduleItem;
        });

        setScheduleItems(upadteScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post("classes",{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
               
        }).then(() => {
            alert("Cadastro realizado com sucesso!");

            history.push("/");
        }).catch(() => {
            alert("Erro no cadastro! ");
        });
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"                
            /> 
            
            <form onSubmit={handleCreateClass}>
                <main>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange= {(e) => { setName(e.target.value) }}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange= {(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp} 
                            onChange= {(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange= {(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange= {(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: "Artes", label:"Artes"},
                                { value: "Biologia", label:"Biologia"},
                                { value: "Ciência", label:"Ciência"},
                                { value: "Educação Física", label:"Educação Física"},
                                { value: "Física", label:"Física"},
                                { value: "Geografia", label:"Geografia"},
                            ]}
                        />

                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange= {(e) => { setCost(e.target.value) }}
                        />
                    
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewSchudleItem}>
                                + Novo Horário
                            </button>
                        </legend>
                            
                    {scheduleItems.map((scheduleItem, index) => {
                        return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Dia da semana"
                                    value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemvalue(index, "week_day", e.target.value)}
                                    options={[
                                        { value: "0", label:"Domingo"},
                                        { value: "1", label:"Segunda-Feira"},
                                        { value: "2", label:"Terça-Feira"},
                                        { value: "3", label:"Quarta-Feira"},
                                        { value: "4", label:"Quinta-Feira"},
                                        { value: "5", label:"Sexta-Feira"},
                                        { value: "6", label:"Sábado"},
                                    ]}
                                />
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    onChange={e => setScheduleItemvalue(index, 'from', e.target.value)}
                                    value={scheduleItem.from}
                                />
                                <Input
                                    name="to"
                                    label="Até"
                                    type="time"
                                    onChange={e => setScheduleItemvalue(index, 'to', e.target.value)}
                                    value={scheduleItem.to}
                                />
                            </div>
                        );
                    })}

                    </fieldset>   

                    <footer>
                        <p><img src={warningIcon} alt="aviso importante"/>
                            Importante <br/>
                            Prencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </main>
            </form>
        </div>
    )
}

export default TeacherForm;