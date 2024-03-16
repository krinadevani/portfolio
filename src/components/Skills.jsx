import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  },
};

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const renderSkillsIntro = (intro) => (
    <p style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </p>
  );

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {renderSkillsIntro(data.intro)}
              {data.languages?.map((rows) => (
                <div style={{ marginTop: 10 }}>
                  <h3>{rows.title}</h3>
                  <div className="row">
                    {rows.items.map((item) => (
                      <div className="col-md-4" key={item.title}>
                        <div className="card mb-4">
                          <div className="card-body">
                            <h4 className="card-title">
                              <img
                                style={styles.iconStyle}
                                src={item.icon}
                                alt={item.title}
                              />
                              <span>{item.title}</span>
                            </h4>
                            <p className="card-text" style={{ fontFamily: 'sans-serif, Jost', fontSize: '0.88rem' }}>
                              <span>
                                Proficiency:
                                {item.proficiency}
                              </span>
                            </p>
                            <p className="card-text"><small className="text-muted">{item.desc}</small></p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {data.databases?.map((rows) => (
                <div style={{ marginTop: 10 }}>
                  <h3>{rows.title}</h3>
                  <div className="row">
                    {rows.items.map((item) => (
                      <div className="col-md-4" key={item.title}>
                        <div className="card mb-4">
                          <div className="card-body">
                            <h4 className="card-title">
                              <img
                                style={styles.iconStyle}
                                src={item.icon}
                                alt={item.title}
                              />
                              <span>{item.title}</span>
                            </h4>
                            <p className="card-text" style={{ fontFamily: 'sans-serif, Jost', fontSize: '0.88rem' }}>
                              <span>
                                Proficiency:
                                {item.proficiency}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {data.skills?.map((rows) => (
                <div key={rows.title}>
                  <br />
                  <h3>{rows.title}</h3>
                  <div className="row">
                    {rows.items.map((item) => (
                      <div className="col-md-3" key={item.title}>
                        <div className="border p-3 mb-3">
                          <h6 style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              style={styles.iconStyle}
                              src={item.icon}
                              alt={item.title}
                            />
                            <p style={{ margin: 0 }}>{item.title}</p>
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
