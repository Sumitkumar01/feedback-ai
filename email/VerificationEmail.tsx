import {
  Html,
  Head,
  Font,
  Text,
  Button,
  Preview,
  Section,
  Row,
  Heading,
} from "@react-email/components";

interface VarificationEmailProps {
  username: string;
  verifyCode: string;
}

export default function VerificationEmail({
  username,
  verifyCode,
}: VarificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Verdana:wght@400;700&display=swap",
            format: "woff2",
          }}
          fontWeight="400"
          fontStyle="normal"
        />
        <title>Verification Code</title>
      </Head>
      <Preview>
        Here&apos;s your verification code for Feedback AI {verifyCode}
      </Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username} from Feedback AI</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for signing up. Here&apos;s your verification code:
          </Text>
        </Row>
        <Row>
          <Text>{verifyCode}</Text>
        </Row>
        {/* <Row>
          <Button
            href={`https://feedback.ai/verify/${verifyCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {verifyCode}
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}
