import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DayPicker,{DayModifiers} from 'react-day-picker'
import {isToday, isAfter,format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import 'react-day-picker/lib/style.css'
import {Global,Container,Header, HeaderContent,Profile, Content, Schedule,NextAppointment,Section, Appointment, Calendar} from './styles'

import logoImg from '../../assets/logo_1.svg'
//import Avatar from '../../assets/exampleIcon.png'
import DefaultImage from '../../assets/PersonIcon.png'

import { FiClock, FiPower } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Link } from 'react-router-dom'


interface MonthAvailabilityItem{
    day:number;
    available:boolean
}
interface Appointment{
    id:string;
    date: string;
    hourFormatted:number;
    user:{
        name:string;
        avatar_url:string
    }
}
const Home:React.FC= () =>{
    const {user,signOut} = useAuth()
    
    const [selectedDate, setSelectedDate] = useState(new Date()) 
    const [currentMonth,setCurrentMonth] = useState(new Date())
    const [monthAvailability,SetMonthAvailability] = useState<MonthAvailabilityItem[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([])

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers)=>{
       if (modifiers.available && !modifiers.disabled){
           setSelectedDate(day)
       }
    },[])

    const handleMonthChange = useCallback((month:Date)=>{
        setCurrentMonth(month)
    },[])

    useEffect(()=>{
        api.get(`/providers/${user.id}/month-availability`,{
            params:{
                year:currentMonth.getFullYear(),
                month:currentMonth.getMonth()+1,
            }
        }).then(response =>{
            SetMonthAvailability(response.data)
        })
    },[currentMonth,user.id])

    useEffect(()=>{
        api.get<Appointment[]>('/appointments/provider',{
            params:{
                year:selectedDate.getFullYear(),
                month:selectedDate.getMonth() + 1,
                day:selectedDate.getDate(),
            }
            }).then(response =>{
                
                const appointmentsFormatted = response.data.map(appointment =>{
                    
                    return{
                        ...appointment,
                        hourFormatted:Number(format(parseISO(appointment.date),'HH'))
                    }
                    
                })
               
              
                appointmentsFormatted.sort((a,b)=>a.hourFormatted - b.hourFormatted)
                
                
                setAppointments(appointmentsFormatted)
                
                console.log(appointmentsFormatted)
                
            })
    },[selectedDate])

    

    const disabledDays = useMemo(()=>{
        const dates = monthAvailability.filter(monthDay => monthDay.available === false).map(monthDay =>{
            const year = currentMonth.getFullYear()
            const month = currentMonth.getMonth();
            return new Date(year,month,monthDay.day)
        })
        return dates

    },[currentMonth, monthAvailability])

    const selectedDateAsText = useMemo(()=>{
        return format(selectedDate,"'Dia' dd 'de' MMMM", {locale: ptBR})
    },[selectedDate])

    const selectedWeekDay = useMemo(()=>{
        return format(selectedDate,'cccc', {locale: ptBR})
    },[selectedDate])

    const morningAppointments = useMemo(()=>{
        return appointments.filter(appointment =>{
            return parseISO(appointment.date).getHours()<12
        })
    },[appointments])

    const afternoonAppointments = useMemo(()=>{
        return appointments.filter(appointment =>{
            return parseISO(appointment.date).getHours()>=12
        })
    },[appointments])

    const nextAppointment = useMemo(()=>{
        return appointments.find(appointment => 
            isAfter(parseISO(appointment.date), new Date()),
            )
    },[appointments])
    //console.log(nextAppointment)
   

    return(
        
        <Container>
            <Global/>
            <Header>
                
                <HeaderContent>
                    <img src={logoImg} width="200px" alt="Logo"/>
                    <Profile>
                        <img src={user.avatar_url ? user.avatar_url : DefaultImage} alt={user.name}/>
                        <div>
                            <span>Bem vindo,</span>
                           <Link to="/profile"> <strong>{user.name}</strong></Link>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower></FiPower>
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                    <Schedule>
                        <h1>Horários agendados</h1>
                        <p>
                        {isToday(selectedDate) &&<span> Hoje </span>}
                            <span>{selectedDateAsText}</span>
                            <span>{selectedWeekDay}</span>
                        </p>

                        { nextAppointment &&  (
                              <NextAppointment>
                
                              <strong>Atendimento a seguir</strong>
                              <div>
                                  <img src={nextAppointment.user.avatar_url ? nextAppointment.user.avatar_url : DefaultImage } alt={nextAppointment.user.name}/>
                                  <strong>{nextAppointment.user.name}</strong>
                                  <span>
                                      <FiClock/>
                                      {nextAppointment.hourFormatted+':00'}
                                  </span>
                              </div>
                          </NextAppointment>
                        )}
                  
                    <Section>
                        <strong>Manhã</strong>
                        {morningAppointments.length ===0 && (<p>Nenhum agendamento neste período</p>)}
                        {morningAppointments.map(appointment =>(
                              <Appointment key={appointment.id}>
                              <span>
                                  <FiClock/>
                                  {appointment.hourFormatted+':00'}
                              </span>
                              <div>
                                  <img src={appointment.user.avatar_url ? appointment.user.avatar_url : DefaultImage} alt={appointment.user.name}/>
                                  <strong>{appointment.user.name}</strong>
                              </div>
                          </Appointment>
                        ))}

                      

                        <strong>Tarde</strong>
                        {afternoonAppointments.length ===0 && (<p>Nenhum agendamento neste período</p>)}
                        {afternoonAppointments.map(appointment =>(
                              <Appointment key={appointment.id}>
                              <span>
                                  <FiClock/>
                                  {appointment.hourFormatted+':00'}
                              </span>
                              <div>
                                  <img src={appointment.user.avatar_url ? appointment.user.avatar_url : DefaultImage} alt={appointment.user.name}/>
                                  <strong>{appointment.user.name}</strong>
                              </div>
                          </Appointment>
                        ))}
                    </Section>

                    </Schedule>
                    <Calendar>
                        <DayPicker weekdaysShort={['D','S','T','Q','Q','S','S']}
                        modifiers={{
                            available: {daysOfWeek: [1,2,3,4,5]}
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                        fromMonth={new Date()}
                        disabledDays={[{daysOfWeek:[0,6]},...disabledDays]
                        }/>
                    </Calendar>
                </Content>
        </Container>
      
    )
}

export default Home