import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  InputText,
  Select,
  Typography,
  colors,
} from '@ducky0203/react-native-ui-kit';

export function FormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>();
  const emailInvalid = email.length > 0 && !email.includes('@');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="body">
          Body text — the default paragraph style for content.
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          Caption — small muted helper text.
        </Typography>

        <InputText
          label="Name"
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          helperText="As shown on your ID."
        />
        <InputText
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          invalid={emailInvalid}
          errorText="Email must contain @."
          helperText="We never share your email."
        />
        <InputText label="Disabled" value="Read only value" disabled />
        <InputText label="Notes" placeholder="Multiline input..." multiline />

        <Select
          label="Role"
          placeholder="Tap to choose a role"
          value={role}
          onChange={setRole}
          options={[
            { label: 'Developer', value: 'dev' },
            { label: 'Designer', value: 'design' },
            { label: 'Product Manager', value: 'pm' },
            { label: 'QA Engineer', value: 'qa' },
            { label: 'DevOps', value: 'devops' },
            { label: 'Unavailable role', value: 'none', disabled: true },
          ]}
          helperText="Dropdown opens anchored to this field."
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 14,
  },
  container: {
    flex: 1,
  },
});
