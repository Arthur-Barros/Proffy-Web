import  React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/51407751?s=460&u=ffe2181419d1dd1cb5aaa369391a820a017c430b&v=4" alt="Arthur Barros"/>
                <div>
                    <strong>Arthur Barros</strong>
                    <span>Java Script</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de químice avançada.
                <br/>
                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>

    </article>
    )
}


export default TeacherItem;