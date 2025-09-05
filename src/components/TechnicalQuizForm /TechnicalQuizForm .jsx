import React from 'react';
import './TechnicalQuizForm.css';
import { useForm } from 'react-hook-form';
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";

const TechnicalQuizForm = ({ onTechnologySelect }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      yearsOfExperience: '0-1 Years', 
      firstName: '',  
      lastName: '',
      hrPersonName: '',
      technologies: {
        reactjs: { selected: false, level: 3 },
        nodejs: { selected: false, level: 3 },
        javascript: { selected: false, level: 3 },    
        python: { selected: false, level: 3 },
        java: { selected: false, level: 3 },
        angular: { selected: false, level: 3 },
      }
    }
  });

  const handleStartQuiz = (data) => {
    console.log('Form Data:', data);
    localStorage.setItem('email', data.email);
    const selectedTechnologies = Object.entries(data.technologies)
      .filter(([_, value]) => value.selected)
      .map(([tech]) => tech);
    onTechnologySelect(selectedTechnologies);
    console.log('Selected Technologies:', selectedTechnologies);
    
    onechnologySelect(selectedTechnologies);
    alert('Quiz started! Check console for form data.');
  };

  const techIcons = {
    reactjs: <FaReact color="#61DBFB" size={20} />,
    nodejs: <FaNode color="#8CC84B" size={20} />,
    javascript: <FaJs color="#F7DF1E" size={20} />,
    python: <FaPython color="#3776AB" size={20} />,
    java: <FaJava color="#007396" size={20} />,
    angular: <FaAngular color="#DD0031" size={20} />
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form-card">
          <div className="header">
            <div className="header-title">
              <span className="header-icon">&lt;/&gt;</span>
              <h1>Technical Quiz Portal</h1>
            </div>
            <p className="header-subtitle">Please fill in your details to start the assessment</p>
          </div>

          <div className="form">
            <form onSubmit={handleSubmit(handleStartQuiz)}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="input"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.email && <span className="error">Please enter a valid email address.</span>}
                </div>
                <div className="form-group">
                  <label>
                    Years of Experience <span className="required">*</span>
                  </label>
                  <select
                    className="select"
                    {...register('yearsOfExperience', { required: true })}
                  >
                    <option>0-1 Years</option>
                    <option>1-2 Years</option>
                    <option>2-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    {...register('firstName', { required: true })}
                  />
                  {errors.firstName && <span className="error">First name is required.</span>}
                </div>
                <div className="form-group">
                  <label>
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    {...register('lastName', { required: true })}
                  />
                  {errors.lastName && <span className="error">Last name is required.</span>}
                </div>
              </div>

              <div className="form-group">
                <label>
                  HR Person Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  {...register('hrPersonName', { required: true })}
                />
                {errors.hrPersonName && <span className="error">HR Person name is required.</span>}
              </div>

              <div className="form-group">
                <label>
                  Select Technologies & Expertise Level <span className="required">*</span>
                </label>
                <div className="technologies">
                  {Object.entries(watch('technologies')).map(([tech, data]) => (
                    <div key={tech} className="technology">
                      <div className="technology-header">
                        <input
                          type="checkbox"
                          id={tech}
                          className="checkbox"
                          {...register(`technologies.${tech}.selected`)}
                        />
                        <span className="tech-icon">{techIcons[tech]}</span>
                        <label htmlFor={tech} className="tech-label">
                          {tech === 'reactjs' ? 'React.js' : tech === 'nodejs' ? 'Node.js' : tech}
                        </label>
                      </div>
                      {data.selected && (
                        <div className="technology-slider">
                          <div className="slider-header">
                            <span>Expertise Level</span>
                            
                          </div>
                          <div className="slider-container">
                            <span className="slider-label">Beginner</span>
                            <input
                              type="range"
                              min="1"
                              max="3"
                              className="slider"
                              {...register(`technologies.${tech}.level`)}
                            />
                            
                            <span className="slider-label">Expert</span>
                          </div>
                          <span className="slider-level">{data.level==1?'Beginner':data.level==2?'Intermediate':'Expert'}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="start-button">
                <span>▶</span>
                Start Quiz
              </button>
            </form>
          </div>
        </div>

        <div className="footer">
         
        </div>
      </div>
    </div>
  );
};

export default TechnicalQuizForm;