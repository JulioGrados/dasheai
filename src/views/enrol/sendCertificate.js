import { Button } from 'antd'
import PDF from 'utils/functions/warrant'

import { MEDIA_PATH } from 'utils/files/path'

export const SendCertificate = ({
  disabled,
  changeSetDisbled,
  onHandleConstance,
  name = 'Carlos Eduardo Plasencia Prado',
  course = 'Curso de Excel profesional',
  shortCourse = 'Excel profesional',
  horas = 240,
  inicio = '30 de Enero de 2020',
  fin = '30 de Marzo de 2020',
  colegio = 'COLEGIO DE ESTADÍSTICOS DEL PERÚ CONSEJO REGIONAL LA LIBERTAD',
  code = 47465282,
  logo = '/static/img/logo.png',
  tables = [
    {
      title: 'Curso de Execel Profesional',
      columns: [
        { header: 'MOD.', dataKey: 'number' },
        { header: 'TEMA', dataKey: 'lesson' },
        { header: 'NOTA', dataKey: 'score' }
      ],
      data: [
        { number: 'Sweden', lesson: 'Canada', score: 'China' },
        { number: 'Norway', lesson: 'Mexico', score: 'Japan' }
      ]
    }
  ]
}) => {
  // const image = logo ? MEDIA_PATH + logo : '/static/img/logo.png'
  const count = shortCourse.length
  const sizeLetter = (count <= 71) ? 19 : (count <= 81) ? 17 : (count <= 91) ? 14 : 12
  
  const genetate = () => {
    const pdf = new PDF()

    const fonts = pdf.fonts()
    console.log(fonts)

    pdf.doc.setProperties({
      title: `Certificado - ${course} - ${name}`.toUpperCase(),
      creator: 'Escuela Americana de Innovación'
    })

    const center = (pdf.doc.internal.pageSize.getWidth() - 50) / 2

    // console.log('center', pdf.doc.internal.pageSize.getWidth() - 60)

    let index = 0,
      res = []

    while ((index = colegio.indexOf(' ', index + 1)) > 0) {
      res.push(index)
    }

    const exec = res.find(item => item > 37)
    const qr = document.getElementById('qr')

    pdf.image({
      img: qr,
      y: 0,
      x: 0,
      width: 297.0000833333333,
      height: 210.0015555555555
    })

    pdf.text({
      y: -12,
      x: center,
      text: 'CERTIFICADO',
      size: 34,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 3,
      x: center,
      text: 'CURSO DE ESPECIALIZACIÓN',
      size: 19,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 18,
      x: center,
      text: shortCourse.toUpperCase(),
      size: sizeLetter,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 28,
      x: center,
      text: 'Otorgado a:',
      size: 17,
      fontStyle: 'normal',
      align: 'center'
    })

    pdf.text({
      y: 38,
      x: center,
      text: name,
      size: 19,
      fontStyle: 'bold',
      align: 'center'
    })

    pdf.text({
      y: 49,
      x: center,
      text: `Por concluir y cumplir los requisitos de aprobación del curso realizado el ${inicio} hasta el ${fin}, con un total de ${horas} horas académicas.`,
      size: 15,
      fontStyle: 'normal',
      align: 'center'
    })

    pdf.text({
      y: 138,
      x: 5,
      text: `Código de verificación: ${code}`,
      size: 11,
      fontStyle: 'normal',
      align: 'left'
    })

    let finalY = 75
    console.log(tables)

    if (finalY - 30 > 180) {
      pdf.addPage()
      finalY = 10
    } else {
      finalY -= 15
    }
    const data = pdf.send()
    onHandleConstance(data)
  }

  return (
    <>
      <Button onClick={() => {
        changeSetDisbled(true)
        genetate()
      }} disabled={disabled}>Enviar mail Certificado</Button>
      <img id='qr' src='/static/img/certificado.jpeg' style={{ display: 'none' }} />
    </>
  )
}
