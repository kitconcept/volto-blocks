import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';

import slider1 from './Slider1_funktioniert-natuerlich.jpg';
import slider2 from './Slider2_Rezeptwelten.jpg';
import slider3 from './Slider3a_Urgetreide.jpg';
import arrowSVG from './arrow.svg';

const HomepageSlider = () => {
  return (
    <Slider
      customPaging={dot => <div />}
      dots={true}
      dotsClass="slick-dots slick-thumb"
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      arrows={false}
    >
      <div>
        <div
          className="slide slide1"
          style={{
            background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider1}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div>
            <div className="lead-pill">
              <h1>Funktioniert &ndash; natürlich!</h1>
            </div>
            <div className="secondary-pill">
              <p className="mobile hidden">
                <strong>
                  Wir stehen für Genuss, Funktionalität und Natürlichkeit.
                </strong>{' '}
                <br />
                Clean Label und Clean Tech spielen bei uns ebenso eine große
                Rolle wie eine traditionelle Herstellung, ausgezeichneter
                Geschmack und die einfache und gelingsichere Anwendung für
                unsere Kunden.
              </p>
              <p className="mobile only">
                <strong>
                  Wir stehen für Genuss, Funktionalität und Natürlichkeit.
                </strong>{' '}
                Clean Label und Clean Tech spielen bei uns ebenso eine große
                Rolle…
              </p>
              <Button
                as={Link}
                to="/kompetenzen/individuelle-loesungen"
                className="medium brandButtonSecondary"
              >
                Mehr lesen
                <Icon name={arrowSVG} size="23px" className="right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="slide slide2"
          style={{
            background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider2}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div>
            <div className="lead-pill">
              <h1>Ideenreich backen</h1>
            </div>
            <div className="secondary-pill">
              <p className="mobile hidden">
                <strong>
                  Mehr als 2.300 Rezepte hält unsere umfangreiche Datenbank
                  bereit.
                </strong>
                &nbsp; Dazu gibt es Nährwerttabellen, Rohstoffkalkulationen und
                Verkaufsinformationen. Stöbern Sie gern! Lassen Sie sich
                inspirieren von der Ideen- und Themenvielfalt.
              </p>
              <p className="mobile only">
                <strong>
                  Mehr als 2.300 Rezepte hält unsere umfangreiche Datenbank
                  bereit.
                </strong>
                &nbsp; Dazu gibt es Nährwerttabellen, Rohstoffkalkulationen…
              </p>
              <Button
                as={Link}
                to="/rezepte/rezeptwelten"
                className="medium brandButtonSecondary"
              >
                Mehr lesen
                <Icon name={arrowSVG} size="23px" className="right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="slide slide3"
          style={{
            background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider3}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div>
            <div className="lead-pill">
              <h1 />
            </div>
            <div className="secondary-pill">
              <p className="mobile hidden">
                <strong>Alte Getreidearten liegen im Trend.</strong> Der Wunsch
                nach unverfälschten Nahrungsmitteln und Artenvielfalt hat die
                Nachfrage nach Dinkel, Einkorn, Emmer & Co. stark erhöht.
                Urgetreide ist ein Sinnbild für handwerkliche Tradition und
                Authentizität. Und es schmeckt!
              </p>
              <p className="mobile only">
                <strong>Alte Getreidearten liegen im Trend.</strong> Der Wunsch
                nach unverfälschten Nahrungsmitteln und Artenvielfalt hat die
                Nachfrage…
              </p>
              <Button
                as={Link}
                to="/produkte/urgetreide"
                className="medium brandButtonSecondary"
              >
                Mehr lesen
                <Icon name={arrowSVG} size="23px" className="right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default HomepageSlider;
