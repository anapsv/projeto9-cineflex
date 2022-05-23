import styled from "styled-components";
import { Link } from "react-router-dom"
export default function Success({
    data,
    movieObj,
}) {
    ;
    console.log(data);
    console.log(movieObj);

    console.log(movieObj);

    console.log(data);
    console.log(movieObj);
    return (
        <Container>
            <p>Pedido feito com sucesso!</p>

            <Box>
                <p>Filme e sessão</p>
                <span>{movieObj.movie.title}</span>
                <span>{movieObj.day.date}    {movieObj.name}</span>
            </Box>
            <Box>
                <p>Ingressos</p>
                {data.ids.map((i, index) => <span key={index}>Assento {i} </span>)}
            </Box>
            <Box>
                <p>Comprador</p>
                <span>Nome: {data.name}</span>
                <span>CPF: {data.cpf}</span>
            </Box>

            <Link to={"/"}><Button> Voltar para Home</Button></Link>
        </Container>
    );
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  width: 100%;

  > p {
    color: #247A6B;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 50px;
  }
`;

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding-bottom: 30px;

  > p {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 14px;
  }

  span {
    box-sizing: border-box;  
    font-size: 22px;
    font-weight: 400;
    padding-bottom: 6px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  background-color: #e8833a;
  margin: 60px 20px 100px 20px;
  font-size: 20px;
  height: 50px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: white;
`;