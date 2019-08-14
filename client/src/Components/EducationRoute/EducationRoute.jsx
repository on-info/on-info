import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { getLocations, addEducation } from '../../educationCalls';
import programs from './programs.json';
import InvalidInputMessage from './InvalidInputMessage/InvalidInputMessage';
import { redirectTime } from '../../configs/config.json';
import cancelablePromise from '../../utils/cancelablePromise';
import './EducationRoute.css';
import './SelectStyles.css';

const defaultValues = {
  locations: [],
  name: '',
  phone: '',
  email: '',
  regionIndex: '',
  regionDistricts: [],
  city: '',
  educationalInstitution: '',
  firstYear: '',
  lastYear: '',
  program: '',
  isOpen: false,
};

class EducationRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultValues;
    this.addEducationRoute = this.addEducationRoute.bind(this);
    this.setName = this.setName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.setRegionDistricts = this.setRegionDistricts.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setEducationalInstitution = this.setEducationalInstitution.bind(this);
    this.setProgram = this.setProgram.bind(this);
    this.isRegionDistricts = this.isRegionDistricts.bind(this);
    this.toggleMessageisOpen = this.toggleMessageOpening.bind(this);
    this.setFirstYear = this.setFirstYear.bind(this);
    this.setLastYear = this.setLastYear.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setFirstYear(event) {
    this.setState({
      firstYear: event.target.value,
    });
  }

  setLastYear(event) {
    this.setState({
      lastYear: event.target.value,
    });
  }

  setCategories() {
    this.setState({ name: this.props.name });
    this.cancelablePromise = cancelablePromise(getLocations());
    this.cancelablePromise.promise
      .then((locations) => {
        this.setState({ locations });
      })
      .catch((err) => {
        window.console.log(err);
      });
  }

  setName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  setPhone(event) {
    this.setState({
      phone: event.target.value,
    });
  }

  setEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  setRegion(event) {
    const city = event.target.value === '6' ? 'Минск' : '';
    this.setState({
      regionIndex: event.target.value,
      city,
    });
  }

  setRegionDistricts(event) {
    this.setState({
      regionDistricts: event,
    });
  }

  setCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  setEducationalInstitution(event) {
    this.setState({
      educationalInstitution: event.target.value,
    });
  }

  setProgram(event) {
    this.setState({
      program: event.target.value,
    });
  }

  toggleMessageOpening() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  isRegionDistricts() {
    if (
      this.state.regionDistricts.length === 0 &&
      this.state.name !== '' &&
      this.state.email !== '' &&
      this.state.regionIndex !== 0
    ) {
      this.toggleMessageOpening();
    }
  }

  redirect() {
    setTimeout(() => {
      this.props.history.push('education-route-users-form');
    }, redirectTime);
  }

  addEducationRoute(event) {
    event.preventDefault();
    const {
      name,
      phone,
      email,
      regionDistricts,
      city,
      educationalInstitution,
      program,
      firstYear,
      lastYear,
      locations,
      regionIndex,
    } = this.state;
    const region = locations[regionIndex].name;
    const { userId } = this.props;
    addEducation({
      name,
      phone,
      email,
      region,
      regionDistricts,
      city,
      educationalInstitution,
      program,
      userId,
      firstYear,
      lastYear,
      regionIndex,
    })
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
    this.setState(defaultValues);
    this.redirect();
  }

  render() {
    const districts = (this.state.locations[this.state.regionIndex] || {}).districts || [];
    const educationalPrograms = ['---', ...programs];
    return (
      <div className='education-route'>
        <h1 className='secondary-heading'>образовательный маршрут</h1>
        <div className='form'>
          <h2 className='form--heading'>Анкета</h2>
          <div className='education-form--description'>
            <p>Уважаемые законные представители детей с особыми образовательными потребностями!</p>
            <p>Предлагаем Вам заполнить анкету по определения образовательного маршрута.</p>
            <p>
              Данная информация поможет Вам найти родителей в Республике Беларусь и объединиться.
            </p>
          </div>
          <form name='educationForm' onSubmit={this.addEducationRoute}>
            <label className='form--label' htmlFor='name'>
              Имя
            </label>
            <input
              value={this.state.name}
              onChange={this.setName}
              id='name'
              type='text'
              placeholder='Имя по которому к Вам можно обратиться'
              className='form--input'
              title='Имя должно содержать только буквы русского алфавита'
              required
            />
            <label className='form--label' htmlFor='phone'>
              Номер телефона
            </label>
            <InputMask
              value={this.state.phone}
              onChange={this.setPhone}
              id='phone'
              placeholder='Введите контактный номер телефона'
              pattern='\+375\([0-9]{2}\)-[0-9]{3}(-[0-9]{2}){2}'
              type='tel'
              mask='+375(99)-999-99-99'
              title='Введите корректный контактный телефон'
              className='form--input'
            />
            <label className='form--label' htmlFor='email'>
              Адрес электронной почты
            </label>
            <input
              value={this.state.email}
              onChange={this.setEmail}
              id='email'
              type='email'
              title='адрес электронной почты должен иметь формат: имя_почты@email.com'
              placeholder='имя_почты@email.com'
              className='form--input'
              required
            />
            <label className='form--label' htmlFor='region'>
              Регион проживания
            </label>
            <select
              id='region'
              title='Вы должны выбрать свой регион'
              className='form--input input--select'
              required
              onChange={this.setRegion}
              value={this.state.regionIndex}
            >
              <option disabled />
              {this.state.locations.map((region, index) => (
                <option key={region.name} value={index}>
                  {region.name}
                </option>
              ))}
            </select>
            <label className='form--label' htmlFor='regionDistrictIndices'>
              Областной район
            </label>
            <Select
              id='regionDistrictIndices'
              title='Вы должны выбрать областной район'
              choiceTransitionName='rc-select-selection__choice-zoom'
              multiple
              allowClear
              onChange={this.setRegionDistricts}
              notFoundContent='Пожалуйста, выберите регион проживания'
              placeholder='▼'
              value={this.state.regionDistricts}
            >
              {districts.map(district => (
                <Option key={district} title={district}>
                  {district}
                </Option>
              ))}
            </Select>
            {this.state.isOpen && (
              <InvalidInputMessage message='Пожалуйста, выберите регион проживания' />
            )}
            <label className='form--label' htmlFor='city'>
              Город
            </label>
            <input
              id='city'
              onChange={this.setCity}
              type='text'
              value={this.state.city}
              title='Название города должно содержать только буквы русского алфавита'
              placeholder='Ваш город'
              className='form--input'
              required
            />
            <p className='form--label'>Выберите учреждение образования</p>
            <div className='education-form--radio-wrapper'>
              <label className='education-form--radio-description' htmlFor='kindergarten'>
                <input
                  type='radio'
                  id='kindergarten'
                  className='education-form--radio'
                  name='setEducationalInstitution'
                  value='Дошкольное детское учреждение'
                  onChange={this.setEducationalInstitution}
                  required
                />
                Дошкольное детское учреждение
              </label>
              <label className='education-form--radio-description' htmlFor='school'>
                <input
                  type='radio'
                  className='education-form--radio'
                  id='school'
                  onChange={this.setEducationalInstitution}
                  name='setEducationalInstitution'
                  value='Средняя школа'
                />
                Средняя школа
              </label>
            </div>
            <label className='form--label' htmlFor='first-year'>
              В каком году учащийся пойдет в учреждение образования
            </label>
            <p className='form--label form--label-inline'>
              <label htmlFor='first-year' className='label-inline-description'>
                c
              </label>
              <input
                id='first-year'
                value={this.state.firstYear}
                onChange={this.setFirstYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='form--input label-inline--input'
                min='2018'
                max='2100'
                required
              />
              <label htmlFor='last-year' className='label-inline-description'>
                по
              </label>
              <input
                id='last-year'
                value={this.state.lastYear}
                onChange={this.setLastYear}
                type='number'
                title='дата должна содержать только год и начинаться с 20..'
                placeholder='20__'
                className='form--input label-inline--input'
                min='2018'
                max='2100'
                required
              />
            </p>
            <label className='form--label' htmlFor='program'>
              Рекомендованная программа образования
            </label>
            <select
              id='program'
              className='form--input input--select'
              value={this.state.program}
              onChange={this.setProgram}
            >
              {educationalPrograms.map(program => <option key={program}>{program}</option>)}
            </select>
            <input
              type='submit'
              className='form-library--button control-button control-button-primary'
              value='Отправить'
              onClick={this.isRegionDistricts}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EducationRoute);

EducationRoute.propTypes = {
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
