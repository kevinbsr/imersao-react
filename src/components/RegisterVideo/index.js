import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function getVideoId(url) {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }
  return videoId;
}

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// Whiteboarding
// Custom Hook
function useForm(propsDoForm){
  const [values, setValues] = React.useState(propsDoForm.initialValues);
  
  return {
    values,
    handleChange: (evento) => {
      console.log(evento.target);
      const value = evento.target.value;
      const name = evento.target.named
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({})
    }
  }
}

const PROJECT_URL = "https://dwzfwwnwtsjtfwiwqikd.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3emZ3d253dHNqdGZ3aXdxaWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MDk0MjMsImV4cCI6MTk5MTQ4NTQyM30.qDpyISZyCYW6oc4oursqkouuinZSdKRINa5QlU_F2jk"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "" }
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  console.log();

  /* 
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
      - titulo
      - url do video
    - precisamos adicionar um onSubmit para o nosso form
    - limpar o formulário após o submit
  */
  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {
        /* 
          Ternário
          Operadores de Curto-circuito
        */
      }
      {formVisivel ? (
        <form onSubmit={(evento) => {
          evento.preventDefault();
          console.log(formCadastro.values);

          // Contrato entre o nosso Front e o BackEnd
          supabase.from("video").insert({
            title: formCadastro.values.titulo,
            url: formCadastro.values.url,
            thumb: getThumbnail(formCadastro.values.url),
            playlist: "music",
          })
          .then((oqueveio) => {
            console.log(oqueveio);
          })
          .catch(() => {
            console.log(err);
          })

          setFormVisivel(false)
          formCadastro.clearForm()
        }}>
          <div>
            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
              x
            </button>
            <input 
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo} 
              onChange={formCadastro.handleChange}
            />
            <input 
              placeholder="URL do vídeo" 
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      )
      : false }
    </StyledRegisterVideo>
  )
}

  // [x] Falta adicionar o botão
  // [x] Modal
  // -> [x] Precisamos controlar o state
  // -> Formulário em si