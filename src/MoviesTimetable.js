import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function MoviesTimetable() {

    let [movie, setMovie] = useState({});
    const { movieid } = useParams();
    useEffect(() => {

        const promiseMovie = axios.get(
            `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieid}/showtimes`
        );
        promiseMovie.then((response) => {
            setMovie(response.data);

        });
    }, [movieid]);

    if (Object.keys(movie).length === 0) {
        return <>Carregando</>;
    }

    return (
        <>
            <Container>
                <p>Selecione o horário</p>
                <Time>
                    {movie.days.map((obj, i) => (
                        <Day key={i} id={obj.id} >
                            <span>
                                {obj.weekday} - {obj.date}
                            </span>
                            <div>
                                <Link to={`/sessao/${obj.showtimes[0].id}`}>
                                    {" "}
                                    <p>{obj.showtimes[0].name}</p>
                                </Link>
                                <Link to={`/sessao/${obj.showtimes[1].id}`}>
                                    {" "}
                                    <p>{obj.showtimes[1].name}</p>
                                </Link>
                            </div>
                        </Day>
                    ))}
                </Time>
            </Container>
            <Footer>
                <img src={movie.posterURL} alt="poster" />
                <div>
                    <span>{movie.title}</span>
                </div>
            </Footer>
        </>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 70px;

  > p {
      font-weight: 400;
    font-size: 24px;
    margin: 50px 0 60px 0;
  }
`;

const Time = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Day = styled.div`
    display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  span {
  font-weight: 400;
  font-size: 20px;
  margin-left: 20px;
}
> div {
  display: flex;
}

div  p {
  cursor: pointer;
  background-color: #e8833a;
  margin: 20px;
  font-size: 20px;
  height: 50px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
}
`;

const Footer = styled.div`

  position: fixed;
  bottom: 0;
  height: 117px;
  width: 100%;
  background-color: #dfe6ed;
  display: flex;
  align-items: center;
  
  span {
    font-size: 26px;
    font-weight:400;
  }
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
`;