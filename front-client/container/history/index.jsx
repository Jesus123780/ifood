import { useEffect, useState } from 'react';
import { PColor } from '../../public/colors';
import { IconCancel, IconTicker, IconLogo, IconSearch } from '../../public/icons';
import { Body, BtnNav, Header, Box, ContainerBtn, Text, ContentHeader, BoxJr, Anchor, HeaderContent, ContentInputSearch, ButtonSearch, ScrollbarContainer, ContentImgs, Section, Acquisition, BoxLi } from './styled';
import Link from 'next/link'
import { useRouter } from 'next/router'

export const History = () => {
    const [close, setClose] = useState(false)
    const [name, setName] = useState(false)
    const location = useRouter()

    function capFirst(string) {
        return string?.charAt(0)?.toUpperCase() + string?.slice(1);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        var name1 = ["Comida china", 'arroz', 'Pollo', 'Comida'];
        var name = capFirst(name1[getRandomInt(0, name1.length - 1)]);
        setName(name)
    }, [name, setName])
    const dataArray = [
        {
            name: 'Comida 1',
        },
        {
            name: 'Comida 2',
        },
        {
            name: 'Comida 3',
        },
        {
            name: 'Comida 4',
        },
        {
            name: 'Comida 4',
        },
        {
            name: 'Comida 5',
        },
    ]
    return <div>
        <Body>
            <ContentHeader>
                <Header>
                    <div></div>
                    <nav>
                        <BtnNav href="/entrar">
                            <Anchor hover color >
                                Repartidor
                            </Anchor>
                        </BtnNav>
                        <BtnNav href="/restaurantes">
                            <Anchor hover color >Restaurante</Anchor>
                        </BtnNav>
                        <ContainerBtn>
                            <BtnNav href="/entrar">
                                <Anchor BgColor>
                                    Entrar
                                </Anchor>
                            </BtnNav>
                            <Box close={close}>
                                <BoxJr>
                                    <IconTicker size='60px' />
                                </BoxJr>
                                <BoxJr>
                                    <Text className="landing-sign-up-voucher__texts__title">Gane cupones!</Text>
                                    <p className="landing-sign-up-voucher__texts__description">Crea tu cuenta para tener acceso a descuentos</p>
                                    <button className="btn-btn-primary">
                                        <span className="btn__label">Crear cuenta</span>
                                    </button>
                                </BoxJr>
                                <button className="btn-btn-sec" onClick={() => setClose(!close)}>
                                    <IconCancel size='15px' color={PColor} />
                                </button>
                            </Box>

                        </ContainerBtn>
                    </nav>
                    <HeaderContent>
                        <div className="grid-content">
                            <div></div>
                            <div className="flex-center">
                                <IconLogo size='140px' color={PColor} />
                            </div>
                            <div></div>
                        </div>
                        <div>
                            <h1>¡Pedir  <strong> {name}  </strong> nunca ha sido tan fácil</h1>
                            <h3>Encuentra restaurantes cerca de ti</h3>
                        </div>

                        <div className="ContentSearch">
                            <ContentInputSearch onClick={() => location.push('/restaurantes')}>
                                <IconSearch size='30px' color={PColor} />
                                <input placeholder='Buscar' />
                            </ContentInputSearch>
                            <ButtonSearch onClick={() => location.push('/')} type="button" role="button">Buscar</ButtonSearch>
                        </div>
                        <ScrollbarContainer>

                            {dataArray ? dataArray.map(x => (
                                <div className="BtnTarget"># {x.name}</div>
                            )) : <div>No data</div>}
                        </ScrollbarContainer>
                    </HeaderContent>
                </Header>
            </ContentHeader>
            <Section>
                <ContentImgs>
                    <div className="contentimg"></div>
                    <div className="contentimg"></div>
                    <div className="contentimg"></div>
                </ContentImgs>
            </Section>
            <Section>
                <Acquisition>
                    <BoxLi>
                        <img className="landing-acquisition__card-img" src="" alt="Verifica las vacantes abiertas" />
                        <span className="landing-acquisition__card-title">Tu hambre de crecer está en iFood</span>
                        <span className="landing-acquisition__card-subtitle">Registra tu restaurante</span>
                    </BoxLi>
                    <BoxLi>
                        <img className="landing-acquisition__card-img" src="" alt="Verifica las vacantes abiertas" />
                        <span className="landing-acquisition__card-title">Tu hambre de crecer está en iFood</span>
                        <span className="landing-acquisition__card-subtitle">Registra tu restaurante</span>
                    </BoxLi>
                    <BoxLi>
                        <img className="landing-acquisition__card-img" src="" alt="Verifica las vacantes abiertas" />
                        <span className="landing-acquisition__card-title">Tu hambre de crecer está en iFood</span>
                        <span className="landing-acquisition__card-subtitle">Registra tu restaurante</span>
                    </BoxLi>
                </Acquisition>
            </Section>
        </Body>
    </div>;
};
