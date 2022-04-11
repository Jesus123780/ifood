import { FlipCard } from 'components/FlipCard';
import InputHooks from 'components/InputHooks/InputHooks';
import React, { useState } from 'react'
import { getCardType } from 'utils';
import { Container/* , Card  */, Card, CreditCard, Line, Number } from './styled';

export const PaymentCard = ({ dataFav }) => {
    const [flipped, setFlipped] = useState(false)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [cardNum, setCardNum] = useState("");
    const [numOnCard, setNumOnCard] = useState("#### #### #### ####");
    const [cardType, setCardType] = useState("VISA");

    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const handleFocus = () => {
        setFlipped(!flipped)
    }
    const handleOnblur = () => {
        setFlipped(!flipped)
    }
    const cardLogo = {
        VISA: 'visa',
        AMEX: 'amex',
        MASTERCARD: 'master',
        DISCOVER: 'discover'
    };
    const handleNumChange = (e) => {
        let value = e.target.value;
        const userRemovingNum = value.length < cardNum.length;

        if (
            (isNaN(value.split(" ").join("")) && value !== "") ||
            e.nativeEvent.data === " "
        ) {
            //User entered an alphabet
            return;
        }
        if (userRemovingNum) {
            setCardNum(value);

            let num = numOnCard;
            const arr = num.split("");
            if (arr[value.length] != " ") {
                arr.splice(value.length, 1, "#");
            }
            num = arr.join("");
            setNumOnCard(num);
            if (!value.length) {
                setNumOnCard("#### #### #### ####");
                setCardType("VISA");
            }
            return;
        }

        if (value.split(" ").join("").length == 6) {
            //Get the card type
            const type = getCardType(value.split(" ").join(""));
            setCardType(type);
        }
        if (cardType == "AMEX" && value.length <= 17) {
            let num;
            if (value.length >= 8 && value.length <= 14) {
                if (value.length == 8) {
                    num = numOnCard.slice(0, value.length - 1) + "*" + "### #####";
                } else {
                    num =
                        numOnCard.slice(0, value.length - 1) +
                        "*" +
                        numOnCard.slice(value.length);
                }
            } else {
                num = numOnCard.split("");
                num.splice(value.length - 1, 1, value[value.length - 1]);
                num = num.join("");
            }
            setNumOnCard(num);

            if (value.length == 11) {
                value = value + " ";
            }
            setCardNum(value);
        } else if (cardType != "AMEX" && value.length <= 19) {
            let num;
            if (value.length <= 4) {
                num = value + numOnCard.slice(value.length); //oncard
            } else if (value.length >= 6 && value.length <= 15) {
                num =
                    numOnCard.slice(0, value.length - 1) +
                    "*" +
                    numOnCard.slice(value.length);
            } else {
                num = numOnCard.split("");
                num.splice(value.length - 1, 1, value[value.length - 1]);
                num = num.join("");
            }
            setNumOnCard(num);

            if (value.length == 4) {
                value = value + " ";
            } else if (value.length == 9) {
                value = value + " ";
            } else if (value.length == 14) {
                value = value + " ";
            }
            setCardNum(value);
        }
    };
    return (
        <Container>
            <button onClick={() => setFlipped(!flipped)}>voltea</button>
            <input onChange={handleNumChange} value={cardNum} />
            <InputHooks
                title='CCV'
                width={'100%'}
                onFocus={handleFocus}
                onBlur={handleOnblur}
                required
                error={errors?.ccv}
                value={values?.ccv}
                onChange={handleChange}
                name='ccv'
            />
            <InputHooks
                title='CCV'
                type="month"
                width={'100%'}
                onFocus={handleFocus}
                onBlur={handleOnblur}
                required
                error={errors?.ccv}
                value={values?.ccv}
                onChange={handleChange}
                name='ccv'
            />
            <Card>
                <i></i>
                <div>
                    <FlipCard
                        setFlipped={setFlipped}
                        flipped={flipped}
                        frontChild={
                            <CreditCard>
                                {cardLogo[cardType]}
                                <Number>{numOnCard}</Number>
                            
                            </CreditCard>
                        }
                        backChild={
                            <CreditCard backChild={true}>
                                <Line>

                                </Line>
                                {cardLogo[cardType]}
                            </CreditCard>
                        }
                    />
                </div>
            </Card>
        </Container>
    )
}