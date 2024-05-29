import { Typography } from "@mui/material"
import giphy from "../assets/error404-chad.gif";

const Page404: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', border: "2px solid", marginLeft: "8px", marginRight: "8px" }}>
      {/* <Typography variant="h1">Ошибка 404</Typography> */}
      <img src={giphy} alt="404" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
      <Typography variant="h3">Последний раз, когда мы проверяли, страница была здесь...</Typography>
    </div>)
}

export default Page404;