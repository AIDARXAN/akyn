import React from "react";
import hrmNotifications from "../../assets/img/hrmNotifications2.35421d3b.png";
import telegramBotStart from "../../assets/img/telegramBotStart.20e44bba.png";
import telegramBotNotRespond from "../../assets/img/telegramBotNotRespond.d3a2aa5c.png";
import telegramBotCancel from "../../assets/img/telegramBotCancel1.37c19559.png";
import telegramBotNotRespond2 from "../../assets/img/telegramBotNotRespond2.png";
import {telegramBotUsername, urlWithoutApiPrefix} from "../../configAPI";

const SettingsBot = () => {
    const botLink = "https://t.me/" + telegramBotUsername.substring(1);
    const botName = telegramBotUsername;
    const signUpLink = urlWithoutApiPrefix;
    return (
        <div className='content'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='m-card-body'>
                        <div className='help-text-container'>
                            <ul>
                                <li className='help-text'>Для начала нужно зарегистрироваться в &nbsp;
                                    <a href={signUpLink}>{signUpLink}</a>
                                    &nbsp; и попросить админа активировать свой аккаунт
                                </li>
                                <li className='help-text'>После активации профиля нужно заполнить в профиле поля
                                    телефон и дата рождения. После того как профиль активируется вы увидите
                                    сообщения в правом верхнем углу
                                </li>
                                <div><img src={hrmNotifications} alt='Screenshot'/></div>
                                <li className='help-text'>Телефон должен совпадать с тем что у вас в телеграмме для
                                    адекватной регистрации у телеграмм бота по номеру телефона
                                </li>
                                <li className='help-text'>После этого можно приступать к настройке бота</li>
                            </ul>
                            <div className='m-card-head'><p
                                className='help-text text-center font-weight-bold'>Настройка бота автоматического
                                подсчета отработанного времени:</p></div>
                            <ul>
                                списки членов группы выбрать бота &nbsp; <a href={botLink}>{botName}</a>&nbsp;
                                <li className='help-text'>В существующей группе Attractor School Timesheet в
                                    и кликнуть чтобы написать ему сообщение в лс.
                                </li>
                                <li className='help-text'>Откроются личные сообщения с ботом
                                    <a href={botLink}>{botName}</a>.
                                    В них лично боту необходимо отправить команду /start
                                </li>
                                <li className='help-text'>Появится сообщение “Выберите способ связывания
                                    аккаунтов:
                                </li>
                                <div className='image-insert'><img src={telegramBotStart}
                                                                   height='300' alt='Screenshot'/><img
                                    src={telegramBotNotRespond} height='300'
                                    alt='Screenshot'/></div>
                                <li className='help-text'>Под отправкой сообщений нажать либо кнопку “Поделиться
                                    контактом” (привязка с телефоном), либо “По почте” (привязка по почте) и
                                    подтвердить эту команду.
                                </li>
                                <li className='help-text'>Если вы выбрали способ привязки “Поделиться контактом”,
                                    то ваш номер будет отправлен боту и в случае если пользователь с таким номером
                                    будет найден в базе, вы получите сообщение об успешной авторизации.
                                </li>
                                <li>Если вы выбрали способ привязки “По почте”, то вам будет необходимо указать
                                    почту, на которую будет отправлен ключ для привязки аккаунта. От вас требуется
                                    скопировать и отправить этот ключ боту. В случае, если он найдёт ваш e-mail в
                                    базе, вы получите сообщение об успешной авторизации.
                                </li>
                                <li>Далее используйте команду /help</li>
                                <li>Если выполнить команду /help , то появится список всех команд, часть из этих
                                    команд будет для простого пользователя и часть для админа.
                                </li>
                                <li className='help-text'><span className='text-warning'>Важно!</span> Если бот не
                                    ответил на ваше сообщение об отправке номера или email! Просто введите Отмена и
                                    повторите шаги сначала /start
                                </li>
                                <div className='image-insert'><img
                                    src={telegramBotNotRespond2} height='300'
                                    alt='Screenshot'/><img src={telegramBotCancel}
                                                           height='300' alt='Screenshot'/></div>
                            </ul>
                            <div className='m-card-head'><p className='help-text text-center font-weight-bold'>Чтобы
                                отмечать время своего прихода и ухода на работу:</p></div>
                            <ul>
                                <li className='help-text'>В существующей группе Attractor School Timesheet отправляем
                                    сообщение /in. В этом случае будет считаться, что вы начали работать с момента,
                                    когда отправили это сообщение. Если вы начали раньше, то пишите /in время начала
                                    работы. Также вы можете добавлять после /in любой текст. Он будет воспринят как
                                    комментарии.

                                </li>
                                <li className='help-text'>Соответственно, если закончили работу, то в той же группе
                                    Attractor Software Timesheet отправляем сообщение /out . И далее по тому же
                                    принципу, что и для /in.
                                </li>
                                <li className='help-text'>В одном сообщении нельзя отправить, например, сразу время
                                    прихода и ухода. Т.е. Если указать, например, “/in начала из дома 10:30 /out
                                    14:30 продолжу позже”, то такое сообщение не будет воспринято системой для
                                    подсчета отработанных часов. Правильно будет разделить это сообщение на 2 -
                                    сначала отправляете “/in начала из дома 10:30”, а затем “/out 14:30 продолжу
                                    позже”.
                                </li>
                                <li className='help-text'>Если забыли отметить за предыдущий день, то нужно зайти в
                                    систему hrm и отметить вручную, что вы отработали 0,5 или 1 день. Сообщения типа
                                    “вчера пришел /in ... , вчера закончил /out…” работать не будут. Система будет
                                    воспринимать это текущей датой.
                                </li>
                                <li className='help-text'>В случае ошибки при указании время прихода или ухода, если
                                    использовать обычное редактирование сообщений в телеграмме, то оно не будет
                                    воспринято системой. Нужно выбрать команду /clear и в последующих сообщениях
                                    отправить снова /in время прихода, /out время ухода.
                                </li>
                                <li>Если в системе помимо вашей основной роли, например, “преподаватель”, у вас есть
                                    дополнительная роль “наставник”, то по умолчанию бот будет трекать ваше время в
                                    основную роль. Если вы являетесь наставником, то заполнять часы наставничества
                                    вам придётся вручную в специальном разделе внутри HRM.
                                </li>
                            </ul>
                            <div className='m-card-head'>
                                <p className='help-text text-center font-weight-bold'>
                                    Как выбрать значения 0, 0.5 или 1:
                                </p>
                            </div>
                            <div>
                                <p>
                                    В зависимости от роли, которая установлена для вас в системе вам доступны
                                    разные показатели отработанного дня.
                                </p>
                            </div>
                            <ul>
                                <li>Для администрации меньше 1 затреканого часа - значение 0, от 1 до 3 часов -
                                    значение 0,5, от 4 до 9 часов - значение 1.
                                </li>
                                <li>Для преподавателей и младшего преподавателя меньше 1 часа - значение 0, более 1 часа -
                                    значение 1. В случаях, если администратор проводит замену преподавателя на
                                    младшего преподавателя в один из дней, то за эту дату у преподавателя будет 0, а у младшего преподавателя +1
                                    отработанный день. Если у младшего преподавателя в ячейке дня стоит значение 2 - это значит
                                    что помимо отработанных им часов он заменял преподавателя.
                                </li>
                                <li>Для наставников необходимо записывать время в часах от 0 до 9. Допустимо записывать
                                    дробные значения, такие как 2.5, 1.4 и т.д.
                                    Пользователи должны самостоятельно установить значения в ячейках
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsBot;