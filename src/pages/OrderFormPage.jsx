import React, { useState } from "react";
import "./OrderFormPage.css";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const pizzaIngredients = [
  "Pepperoni",
  "Tavuk Izgara",
  "Mısır",
  "Sarımsak",
  "Ananas",
  "Sosis",
  "Soğan",
  "Sucuk",
  "Biber",
  "Kabak",
  "Kanada Jambonu",
  "Domates",
  "Jalepeno",
  "Mantar",
  "Ton balığı",
];

export default function OrderFormPage({fromAppSetOrderData}) {
  //const setOrderData = props.fromAppSetOrderData
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [pizzaType, setPizzaType] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pizzaPrice = 85.5;
  const ingredientsPrice = 5;
  const [errorMessages, setErrorMessage] = useState({});
  const history = useHistory();

  function handleIngredient(ingredient) {
    const currentIngredients = [...ingredients];

    if (currentIngredients.includes(ingredient)) {
      // Eğer ingredient mevcutsa, listeden çıkar
      const updatedIngredients = currentIngredients.filter(
        (item) => item !== ingredient
      );
      setIngredients(updatedIngredients);
    } else if (currentIngredients.length < 10) {
      // Eğer ingredient mevcut değilse ve liste 10 öğeden küçükse, listeye ekle
      setIngredients([...currentIngredients, ingredient]);
    }
  }

  function totalPrice() {
    return (pizzaPrice + ingredients.length * ingredientsPrice) * quantity;
  }
  function formValidate() {
    const checkErrors = {};

    if (!name || name.length < 3) {
      checkErrors.name = "İsim en az 3 karakter olmalıdır";
    }
    if (!size) {
      checkErrors.size = "Lütfen pizza boyutu seçiniz";
    }
    if (!pizzaType) {
      checkErrors.pizzaType = "Lütfen hamur kalınlığı seçiniz";
    }
    if (ingredients.length < 4) {
      checkErrors.ingredients = "En az 4 malzeme seçmelisiniz.";
    }
    setErrorMessage(checkErrors);
    if (Object.keys(checkErrors).length === 0) return true;
    else return false;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formValidate()===false) {
      return;
    }
    const postData = {
      name,
      size,
      pizzaType,
      ingredients,
      note,
      quantity,
      pizzaTotals: totalPrice(),
    };

    axios
      .post("https://reqres.in/api/pizza", postData)
      .then((response) => {
        console.log("Sipariş Özeti", response.data); 
        fromAppSetOrderData(response.data);
        toast.success("Siparişiniz hazırlanıyor :) ")
        history.push("./end");
      })
      .catch((error) => {

        toast.error("Siparişiniz alınamadı :( ")
        console.log("Sipariş başarısız", error);
      });
  }


  //Componentimin render edildiği kısım

  return (
    <div>
      <Form className="form-content" onSubmit={handleFormSubmit}>
        <h3>Position Absolute Acı Pizza</h3>
        <div className="main-rating-div">
          <div className="pizza-price">85.50₺</div>
          <div className="rating-div">
            <span>4.9</span>
            <span>(200)</span>
          </div>
        </div>

        <p className="text-paragraphy">
          Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <div className="name-input-div">
          <h3>
            İsim <span style={{ color: "red" }}>*</span>
          </h3>
          {errorMessages.name && (
            <p className="error-message-p">{errorMessages.name}</p>
          )}
          <Input
            type="text"
            name="name"
            placeholder="Lütfen isim giriniz!"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="pizza-size-type-div">
          <div className="pizza-size-div">
            <h3>
              Boyut Seç<span style={{ color: "red" }}>*</span>
            </h3>
            {errorMessages.size && (
              <p className="error-message-p">{errorMessages.size}</p>
            )}
            <FormGroup>
              <Input
                id="küçük"
                type="radio"
                name="size"
                value="Küçük"
                onChange={(event) => setSize(event.target.value)}
              />
              <label htmlFor="küçük">Küçük</label>
            </FormGroup>
            <FormGroup>
              <Input
                id="orta"
                type="radio"
                name="size"
                value="Orta"
                onChange={(event) => setSize(event.target.value)}
              />
              <label htmlFor="orta">Orta</label>
            </FormGroup>
            <FormGroup>
              <Input
                id="büyük"
                type="radio"
                name="size"
                value="Büyük"
                onChange={(event) => setSize(event.target.value)}
              />
              <label htmlFor="büyük">Büyük</label>
            </FormGroup>
          </div>
          <div className="pizza-type-div">
            <h3>
              Hamur Seç<span style={{ color: "red" }}>*</span>
            </h3>
            {errorMessages.pizzaType && (
              <p className="error-message-p">{errorMessages.pizzaType}</p>
            )}
            <FormGroup>
              <Input
                type="select" //dropdownlist
                name="pizzaType"
                value={pizzaType}
                onChange={(event) => setPizzaType(event.target.value)}
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="ince">İnce</option>
                <option value="orta">Orta</option>
                <option value="kalın">Kalın</option>
              </Input>
            </FormGroup>
          </div>
        </div>

        <div>
          <h3>Ek Malzemeler</h3>
          <p>En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</p>
          {errorMessages.ingredients && (
            <p className="error-message-p">{errorMessages.ingredients}</p>
          )}
        </div>
        <div className="ingredients-div">
          {pizzaIngredients.map((ingredient) => (
            <FormGroup key={ingredient}>
              <Label>
                <Input
                  type="checkbox"
                  onChange={() => handleIngredient(ingredient)}
                  checked={ingredients.includes(ingredient)}
                />
                {" " + ingredient}
              </Label>
            </FormGroup>
          ))}
        </div>
        <div className="textarea-div">
          <h3>Sipariş Notu</h3>
          <Input
            type="textarea"
            name="note"
            id="txtarea"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
        <hr />
        <div className="main-order-div">
          <div className="order-count-div">
            <Button
              className="minus-button"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </Button>
            <span className="counter-span">{quantity}</span>
            <Button
              className="plus-button"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          <div className="total-order-div">
            <div className="price-div">
              <h3>Sipariş Toplamı</h3>
              <div className="selections grey-div">
                <p>Seçimler</p>
                <p>{(ingredients.length * ingredientsPrice).toFixed(2)}₺</p>
              </div>
              <div className="selections red-div">
                <p>Toplam</p>
                <p>{totalPrice().toFixed(2)}₺</p>
              </div>
            </div>
            <Button type="submit" className="submit-button">
              Sipariş Ver
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
