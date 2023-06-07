import styles from './privacy.module.css';
export default function Privacy() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.policyHeader}>Privacy Policy</h1>
      <h2 className={styles.policySection}>1. Introduction</h2>
      <p className={styles.policyText}>
                This Privacy Policy describes the personal data collected or generated when
                you use styleswaps&quot;s website. It also explains how your personal data is used,
                shared, and protected, what choices you have relating to your personal data, and how you can contact us.
      </p>

      <h2 className={styles.policySection}>2. Personal Data We Collect</h2>
      <div className={styles.policyText}>
                When you use our services, we collect the following personal data:
        <ol className={styles.policyList}>
          <li>Your username</li>
          <li>Your email address</li>
          <li>The number of tokens you have</li>
          <li>The time of your last request</li>
          <li>Your user role User/Admin</li>
          <li>We collect this data through Google and GitHub OAuth systems during your login process.</li>
        </ol>
      </div>

      <h2 className={styles.policySection}>3. How We Use Your Personal Data</h2>
      <div className={styles.policyText}>
                We use this data to:

        <ol className={styles.policyList}>
          <li>Provide you with our services</li>
          <li>Verify your identity</li>
        </ol>
      </div>

      <h2 className={styles.policySection}>4. Sharing and Disclosure</h2>
      <div className={styles.policyText}>
                We do not share or disclose your personal data.
      </div>

      <h2 className={styles.policySection}>5. Your Rights and Choices</h2>
      <div className={styles.policyText}>
                You have the right to:
                Given the nature of our services, there are no alternatives
                to our data collection process, as this information is required to operate the site.

      </div>

      <h2 className={styles.policySection}>6. How We Protect Your Personal Data</h2>
      <div className={styles.policyText}>
                We protect your personal data using the following security measures:
        <ol className={styles.policyList}>
          <li>Encryption</li>
          <li>Access Control</li>
          <li>Firewalls</li>
        </ol>
      </div>

      <h2 className={styles.policySection}>7. Changes to the Privacy Policy</h2>
      <div className={styles.policyText}>
                We may update this Privacy Policy from time to time in order to reflect, for example, changes to our data practices or for other operational,
                legal, or regulatory reasons. We will notify you of any significant changes by posting a notice on our website.
      </div>

      <h2 className={styles.policySection}>8. Contact Us</h2>
      <p className={styles.policyText}>
                If you have any questions or concerns about this Privacy Policy, you can contact us at our contact page.
      </p>
    </div>

  );
}