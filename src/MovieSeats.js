import Header from "./Header";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieSeats({
  setName,
  setCPF,
  data,
  movieObj,
  setMovieObj,
}) {
  const [allSeats, setAllSeats] = useState([]);
  const { sessionID } = useParams();
  const [selected, setSelected] = useState([]);

  function selectSeat(index, isAvailable) {
    if (isAvailable === true) {
      selected[index] = !selected[index];
      setSelected([...selected]);
    } else {
      alert('Esse assento não está disponível!');
    }
  }

  useEffect(() => {
    const seatPromise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`
    );

    for (let i = 0; i < 50; i++) {
      selected[i] = false;
    }
    seatPromise.then((response) => {
      setAllSeats([...response.data.seats]);
      setMovieObj({ ...response.data });
    });
  }, [sessionID]);
  let navigate = useNavigate();
  function PostAPI(event) {
    event.preventDefault();

    data.ids = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i]) {
        data.ids.push(allSeats[i].id);
      }
    }
    console.log(data);

    const request = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      data
    );
    request.then((response) => {
      console.log(response);
    });
    request.catch((error) => {
      console.log(error);
    });
    navigate("/sucesso");
  }

  return (
    <Container>
      <Header />
      <p>Selecione o assento</p>
      <form onSubmit={PostAPI}>
        <Seats>
          {allSeats.map((item, index) => {
            return (
              <Seat
                state={item.isAvailable}
                selected={selected[index]}
                key={index}
                onClick={() => selectSeat(index, item.isAvailable)}
              >
                {index + 1}
              </Seat>
            );
          })}
        </Seats>
        <Subtitles>
          <div>
            <h6> </h6>
            <p>Selecionado</p>
          </div>
          <div>
            <h6> </h6>
            <p>Disponível</p>
          </div>
          <div>
            <h6> </h6>
            <p>Indisponível</p>
          </div>
        </Subtitles>

        <InputContainer>
          <span>Nome do comprador:</span>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Digite seu nome"
          />
        </InputContainer>
        <InputContainer>
          <span>CPF do comprador:</span>
          <input
            onChange={(e) => setCPF(e.target.value)}
            type="text"
            placeholder="Digite seu CPF.."
          />
        </InputContainer>

        <Button type="submit">Reservar Assento(s)</Button>
      </form>
      <Footer>
        {Object.keys(movieObj).length === 0 ? (
          "carregando"
        ) : (
          <>
            <img src={movieObj.movie.posterURL} alt="poster" />
            <div>
              <span>{movieObj.movie.title}</span>
              <span>
                {movieObj.day.weekday} - {movieObj.name}
              </span>
            </div>
          </>
        )}
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 24px;
    font-weight: 400;
    margin: 40px 0 0 0;
  }

  > form {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Seats = styled.div`
  box-sizing: border-box;
  max-width: 612px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: fit-content;
  padding: 30px 20px;
  gap: 10px;
`;

const Seat = styled.span`
  cursor: pointer;
  width: 30px;
  background-color: ${({ state, selected }) =>
    !state ? "#FBE192" : selected ? "#8DD7CF" : "#C3CFD9"};
  height: 30px;
  font-size: 11px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Subtitles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-bottom: 40px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  div p {
    font-size: 13px;
    font-weight: 400;
    height: fit-content;
    margin: 14px 0 0 0;
  }

  div h6 {
    background-color: red;
    height: 30px;
    width: 30px;
    border-radius: 100px;
  }

  div:nth-child(1) h6 {
    background-color: #8dd7cf;
  }

  div:nth-child(2) h6 {
    background-color: #c3cfd9;
  }

  div:nth-child(3) h6 {
    background-color: #fbe192;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 0 5px 0;
  gap: 10px;

  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border-width: 1px;
  }
`;

const Button = styled.button`
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

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 117px;
  width: 100%;
  background-color: #dfe6ed;
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 400;

  img {
    box-sizing: border-box;
    height: 72px;
    border-width: 4px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    margin: 14px 20px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;