import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/index")
      .then(res => res.text())
      .then(m => setMessage(m));
  }, []);

  return (
    <div className="App">
      <RouterProvider router={root} />
    </div>
  );

}

export default App;
