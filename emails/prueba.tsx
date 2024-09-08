import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PruebaTemplateProps {
  url: string;
  name: string;
  company: string;
}

const PruebaTemplateMail = ({ url, name, company }: PruebaTemplateProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Cracias por registrarte</Preview>
      <Tailwind>
        <Body className="bg-[url('https://res.cloudinary.com/dwdq9al4v/image/upload/v1725818189/pets/nurouslaqtk7stkn56n7.jpg')] bg-cover bg-center px-5 pt-3  flex justify-center items-center min-h-screen  ">
          <Container className="pt-5 pb-0 bg-slate-100 text-slate-800 text-center rounded-lg">
            <Heading className="text-lg font-bold text-center">
              {`¡ Bienvenido ${name || "Usuario"} !`}
            </Heading>
            <Img
              src="https://cdn-icons-png.flaticon.com/512/4144/4144781.png"
              alt="Email image"
              width={120}
              height={120}
              className="mt-10 mx-auto"
            />
            <Text className="mt-5 text-center p-2 text-md">
              {`Gracias, ${name || "Usuario"}, por registrarte en`}
              <span className="text-blue-500 ml-1">{company}</span> <br />
              <br />
              Por favor, confirma tu cuenta haciendo clic en el siguiente botón:
            </Text>
            <Button
              href={url}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded mx-auto"
            >
              Confirmar cuenta
            </Button>
            <Text className="p-2 text-md">
              Si no solicitaste esta cuenta, por favor ignora este correo
              electrónico.
            </Text>
            {/* <Hr className="my-2 w-[90%]" /> */}
            <Section className="bg-slate-800  text-center text-white">
              <Text className="text-xs">
                {`Copyright © ${currentYear} ${
                  company || "Petfinder"
                }. Todos los derechos reservados.`}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PruebaTemplateMail;
