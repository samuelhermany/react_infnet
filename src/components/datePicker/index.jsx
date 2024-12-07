import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR, enUS, esES } from '@mui/x-date-pickers/locales';

const DatePickerComponent = ({ ...props }) => {
   // LocalizationProvider = popup
   // DemoContainer = container do conteudo
   // DatePicker = componente para a selecao da data
   // dateAdapter = ajusta o horario conforme o idioma
    return  <LocalizationProvider
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker {...props} />
                </DemoContainer>
            </LocalizationProvider>
}

export default DatePickerComponent;