// Theme Toggle
(function() {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to system preference
  const getThemePreference = () => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggle) {
      themeToggle.querySelector('.theme-icon').textContent = icon;
    }
    // Update sidebar theme icon if it exists
    const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');
    if (sidebarThemeToggle) {
      sidebarThemeToggle.querySelector('.theme-icon').textContent = icon;
    }
  };

  // Initialize theme
  applyTheme(getThemePreference());

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// Smooth Scroll for Navigation Links
(function() {
  'use strict';

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Intersection Observer for Fade-in Animations
(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: prefersReducedMotion ? 0 : 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
})();

// Ticket Triage Simulator Widget
(function() {
  'use strict';

  const issueTypeSelect = document.getElementById('issueType');
  const prioritySelect = document.getElementById('priority');
  const calculateBtn = document.getElementById('calculateBtn');
  const demoWidget = document.getElementById('demoWidget');
  const demoCloseBtn = document.getElementById('demoCloseBtn');
  
  // Close button functionality
  if (demoCloseBtn && demoWidget) {
    demoCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      demoWidget.classList.toggle('collapsed');
      const isCollapsed = demoWidget.classList.contains('collapsed');
      demoCloseBtn.setAttribute('aria-label', isCollapsed ? 'Expand demo widget' : 'Close demo widget');
    });
    
    // Allow clicking on collapsed widget to expand
    demoWidget.addEventListener('click', (e) => {
      if (demoWidget.classList.contains('collapsed') && !e.target.closest('.demo-close-btn')) {
        demoWidget.classList.remove('collapsed');
        demoCloseBtn.setAttribute('aria-label', 'Close demo widget');
      }
    });
  }
  const demoResult = document.getElementById('demo-result');
  const recommendedAction = document.getElementById('recommendedAction');
  const responseSLA = document.getElementById('responseSLA');
  const resolutionSLA = document.getElementById('resolutionSLA');
  const demoNextSteps = document.getElementById('demo-next-steps');
  const nextStepsList = document.getElementById('nextStepsList');

  // SLA targets based on priority
  const slaTargets = {
    critical: {
      response: '15 minutes',
      resolution: '1 hour'
    },
    high: {
      response: '30 minutes',
      resolution: '4 hours'
    },
    medium: {
      response: '1 hour',
      resolution: '8 hours'
    },
    low: {
      response: '2 hours',
      resolution: '1 business day'
    }
  };

  // Recommended actions based on issue type and priority
  const getRecommendedAction = (issueType, priority) => {
    const actions = {
      hardware: {
        critical: 'Immediately check hardware status, verify power/connections. If confirmed failure, escalate to L2 and coordinate field support. Document all troubleshooting steps.',
        high: 'Verify hardware connections and power status. Check device manager/system logs. If issue persists, escalate to L2 with detailed diagnostics.',
        medium: 'Troubleshoot basic hardware checks (connections, drivers). Review system logs. Document findings and escalate if needed.',
        low: 'Gather initial information, check basic connections. Create detailed ticket for follow-up during business hours.'
      },
      software: {
        critical: 'Assess impact on business operations. Attempt quick fixes (restart, clear cache). If unresolved in 15 minutes, escalate to L2 with full context.',
        high: 'Identify affected users and systems. Apply known solutions from KB. Document workaround if available. Escalate if resolution not found within 2 hours.',
        medium: 'Review error messages and system logs. Check for known issues in KB. Apply standard troubleshooting procedures. Update ticket with findings.',
        low: 'Gather error details and user information. Research KB articles. Schedule resolution during next maintenance window if non-urgent.'
      },
      network: {
        critical: 'Immediately verify network connectivity and DNS resolution. Check firewall rules and VPN status. Coordinate with network team if infrastructure issue suspected.',
        high: 'Test connectivity, verify DNS/DHCP settings. Check VPN configuration. Review network logs. Escalate to network team if infrastructure issue.',
        medium: 'Verify network settings, test connectivity. Check for IP conflicts. Review recent network changes. Document findings.',
        low: 'Gather network configuration details. Test basic connectivity. Research known network issues. Schedule follow-up.'
      },
      access: {
        critical: 'Immediately verify user account status in AD/Azure AD. Check group memberships and conditional access policies. Restore access if account issue found.',
        high: 'Verify user permissions and group memberships. Check for account lockouts or password expiration. Review access logs. Restore access promptly.',
        medium: 'Review user account status and permissions. Verify group memberships. Check for policy changes. Process access request per standard procedure.',
        low: 'Gather user details and required access level. Verify request approval. Process during next access review cycle if non-urgent.'
      },
      printer: {
        critical: 'Immediately check printer status, queue, and connectivity. Verify drivers and print spooler. Clear stuck jobs. Escalate to L2 if hardware failure suspected.',
        high: 'Troubleshoot print queue, verify drivers and connectivity. Check for firmware updates. Clear stuck jobs. Document resolution steps.',
        medium: 'Verify printer connectivity and driver status. Check print queue for errors. Apply standard printer troubleshooting. Update KB if new solution found.',
        low: 'Gather printer model and error details. Check basic connectivity. Research known printer issues. Schedule resolution during business hours.'
      },
      email: {
        critical: 'Immediately check Exchange Online status and user mailbox. Verify authentication and MFA. Check for account lockouts. Restore email access urgently.',
        high: 'Verify Exchange Online connectivity and mailbox status. Check authentication and MFA settings. Review email logs. Restore access promptly.',
        medium: 'Check email client configuration and connectivity. Verify Exchange Online status. Review mailbox settings. Apply standard email troubleshooting.',
        low: 'Gather email client and account details. Verify basic connectivity. Check for known email issues. Process during business hours.'
      }
    };

    return actions[issueType]?.[priority] || 'Please select both issue type and priority to get a recommendation.';
  };

  // Get recommended next steps based on issue type and priority
  // Reflects real IT support workflows and best practices
  const getNextSteps = (issueType, priority) => {
    const nextSteps = {
      hardware: {
        critical: [
          'Verify hardware status and power connections immediately',
          'Check device manager and system logs for error codes',
          'Document all troubleshooting steps and findings',
          'Escalate to Level 2 if hardware failure confirmed',
          'Coordinate field support or replacement if needed'
        ],
        high: [
          'Verify hardware connections and power status',
          'Check device manager and system event logs',
          'Test hardware with known working components if possible',
          'Escalate to Level 2 with detailed diagnostics',
          'Update ticket with resolution or escalation status'
        ],
        medium: [
          'Perform basic hardware checks (connections, drivers)',
          'Review system logs and device manager status',
          'Apply standard hardware troubleshooting procedures',
          'Document findings and escalate if issue persists',
          'Schedule follow-up if resolution requires parts'
        ],
        low: [
          'Gather initial hardware information and error details',
          'Check basic connections and power status',
          'Research known hardware issues in knowledge base',
          'Create detailed ticket for follow-up during business hours',
          'Schedule resolution during next maintenance window'
        ]
      },
      software: {
        critical: [
          'Assess impact on business operations and affected users',
          'Attempt quick fixes: restart application, clear cache, check updates',
          'Check for known issues in knowledge base and vendor advisories',
          'Escalate to Level 2 if unresolved within 15 minutes',
          'Document workaround if available and notify stakeholders'
        ],
        high: [
          'Identify all affected users and systems',
          'Apply known solutions from knowledge base',
          'Check for software updates or patches',
          'Document workaround procedures if available',
          'Escalate to Level 2 if resolution not found within 2 hours'
        ],
        medium: [
          'Review error messages and application/system logs',
          'Check knowledge base for known issues and solutions',
          'Apply standard software troubleshooting procedures',
          'Test solution in isolated environment if possible',
          'Update ticket with findings and resolution steps'
        ],
        low: [
          'Gather error details, screenshots, and user information',
          'Research knowledge base articles and vendor documentation',
          'Verify software version and system requirements',
          'Schedule resolution during next maintenance window if non-urgent',
          'Document issue for future reference and knowledge base'
        ]
      },
      network: {
        critical: [
          'Immediately verify network connectivity and DNS resolution',
          'Check firewall rules, VPN status, and core network services',
          'Identify scope: single user, department, or site-wide',
          'Coordinate with network team if infrastructure issue suspected',
          'Implement immediate workaround and notify affected users'
        ],
        high: [
          'Test connectivity and verify DNS/DHCP settings',
          'Check VPN configuration and authentication status',
          'Review network logs and recent configuration changes',
          'Escalate to network team if infrastructure issue confirmed',
          'Update ticket and notify stakeholders of status'
        ],
        medium: [
          'Verify network settings and test connectivity',
          'Check for IP conflicts and DHCP lease issues',
          'Review recent network changes and maintenance windows',
          'Apply standard network troubleshooting procedures',
          'Document findings and escalate if needed'
        ],
        low: [
          'Gather network configuration details and error messages',
          'Test basic connectivity (ping, DNS resolution)',
          'Research known network issues in knowledge base',
          'Schedule follow-up during business hours',
          'Document for network team review if pattern identified'
        ]
      },
      access: {
        critical: [
          'Immediately verify user account status in AD/Azure AD',
          'Check group memberships and conditional access policies',
          'Review recent access changes and security logs',
          'Restore access immediately if account issue found',
          'Notify user and confirm access restoration'
        ],
        high: [
          'Verify user permissions and group memberships',
          'Check for account lockouts, password expiration, or MFA issues',
          'Review access logs and recent policy changes',
          'Restore access promptly following security procedures',
          'Document resolution and verify user can access required resources'
        ],
        medium: [
          'Review user account status and current permissions',
          'Verify group memberships and role assignments',
          'Check for policy changes or access review requirements',
          'Process access request per standard approval workflow',
          'Confirm access granted and close ticket with documentation'
        ],
        low: [
          'Gather user details and required access level',
          'Verify request approval and business justification',
          'Review access policy and approval workflow',
          'Process during next access review cycle if non-urgent',
          'Notify user of access grant timeline'
        ]
      },
      printer: {
        critical: [
          'Immediately check printer status, queue, and connectivity',
          'Verify drivers, print spooler service, and firmware',
          'Clear stuck print jobs and restart print spooler',
          'Escalate to Level 2 if hardware failure suspected',
          'Coordinate field support or replacement if needed'
        ],
        high: [
          'Troubleshoot print queue and verify driver status',
          'Check printer connectivity and network configuration',
          'Clear stuck jobs and restart print services',
          'Check for firmware updates or driver compatibility issues',
          'Document resolution steps and update knowledge base'
        ],
        medium: [
          'Verify printer connectivity and driver installation',
          'Check print queue for errors and stuck jobs',
          'Apply standard printer troubleshooting procedures',
          'Test print functionality after resolution',
          'Update knowledge base if new solution identified'
        ],
        low: [
          'Gather printer model, error details, and user information',
          'Check basic connectivity and driver status',
          'Research known printer issues in knowledge base',
          'Schedule resolution during business hours',
          'Document for future reference'
        ]
      },
      email: {
        critical: [
          'Immediately check Exchange Online service status',
          'Verify user mailbox status and authentication',
          'Check for account lockouts, MFA issues, or policy blocks',
          'Restore email access urgently following security procedures',
          'Confirm access restoration and verify email functionality'
        ],
        high: [
          'Verify Exchange Online connectivity and mailbox status',
          'Check authentication, MFA settings, and conditional access',
          'Review email logs and recent account changes',
          'Restore access promptly and verify functionality',
          'Document resolution and update ticket'
        ],
        medium: [
          'Check email client configuration and connectivity',
          'Verify Exchange Online service status',
          'Review mailbox settings and sync status',
          'Apply standard email troubleshooting procedures',
          'Test email functionality and confirm resolution'
        ],
        low: [
          'Gather email client details and account information',
          'Verify basic connectivity and authentication',
          'Check for known email issues in knowledge base',
          'Process during business hours',
          'Document issue for future reference'
        ]
      }
    };

    return nextSteps[issueType]?.[priority] || [];
  };

  const calculateAction = () => {
    const issueType = issueTypeSelect.value;
    const priority = prioritySelect.value;

    if (!issueType || !priority) {
      alert('Please select both issue type and priority.');
      return;
    }

    const action = getRecommendedAction(issueType, priority);
    const steps = getNextSteps(issueType, priority);
    const sla = slaTargets[priority];

    // Update recommended action
    recommendedAction.textContent = action;
    
    // Update SLA information
    responseSLA.textContent = sla.response;
    resolutionSLA.textContent = sla.resolution;
    
    // Update next steps
    nextStepsList.innerHTML = '';
    if (steps.length > 0) {
      steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        nextStepsList.appendChild(li);
      });
      demoNextSteps.classList.add('visible');
    } else {
      demoNextSteps.classList.remove('visible');
    }
    
    // Show result sections
    demoResult.classList.add('visible');

    // Smooth scroll to result
    demoResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  calculateBtn.addEventListener('click', calculateAction);

  // Allow Enter key to trigger calculation
  [issueTypeSelect, prioritySelect].forEach(select => {
    select.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateAction();
      }
    });
  });
})();

// Incident Response Simulator
(function() {
  'use strict';

  const startBtn = document.getElementById('startScenarioBtn');
  const endBtn = document.getElementById('endScenarioBtn');
  const tryAnotherBtn = document.getElementById('tryAnotherBtn');
  const scenarioIntro = document.getElementById('scenario-intro');
  const scenarioContent = document.getElementById('scenario-content');
  const scenarioResult = document.getElementById('scenario-result');
  const actionsContainer = document.getElementById('scenario-actions');
  
  // Incident scenarios with realistic IT support situations
  const scenarios = [
    {
      title: 'Scenario 1: Email Outage',
      issue: 'Multiple users reporting inability to send/receive emails. Exchange Online appears operational.',
      users: '25+ users across Sales and Marketing departments',
      impact: 'High - Sales team cannot communicate with clients, potential revenue impact',
      actions: [
        {
          text: 'Check Exchange Online service health dashboard immediately',
          correct: true,
          sla: 'Response within 15 minutes, escalation to Microsoft if service issue',
          escalation: 'Escalate to cloud services team and Microsoft support if confirmed outage',
          explanation: 'Correct. Service health dashboard is the first step to determine if this is a platform-wide issue affecting multiple tenants or isolated to your organization.'
        },
        {
          text: 'Ask users to restart their email clients and try again',
          correct: false,
          sla: 'Delayed response, may miss SLA if this is a service outage',
          escalation: 'Will require escalation after 30 minutes when issue persists',
          explanation: 'Incorrect. With 25+ users affected, this indicates a systemic issue. Restarting clients won\'t resolve a service-level problem and wastes critical time.'
        },
        {
          text: 'Create tickets for each affected user individually',
          correct: false,
          sla: 'SLA tracking becomes complex, may breach response times',
          escalation: 'Inefficient escalation path, should consolidate into single incident',
          explanation: 'Incorrect. Multiple users with the same issue should be handled as a single incident to maintain SLA compliance and efficient resolution.'
        },
        {
          text: 'Check individual user mailbox settings first',
          correct: false,
          sla: 'Response time exceeded, critical business impact continues',
          escalation: 'Delayed escalation, business operations affected',
          explanation: 'Incorrect. With widespread impact, checking individual settings is inefficient. Focus on service-level diagnostics first.'
        }
      ]
    },
    {
      title: 'Scenario 2: Network Connectivity Issue',
      issue: 'Entire office floor (50+ users) lost network connectivity. Wi-Fi and wired connections both affected.',
      users: '50+ users on 3rd floor',
      impact: 'Critical - Complete work stoppage, cannot access any systems or applications',
      actions: [
        {
          text: 'Immediately check network switch status and core infrastructure',
          correct: true,
          sla: 'Response within 15 minutes, escalate to network team',
          escalation: 'Escalate to network infrastructure team immediately',
          explanation: 'Correct. Floor-wide connectivity loss indicates infrastructure issue. Checking switches and core network equipment is the priority action.'
        },
        {
          text: 'Ask users to restart their computers',
          correct: false,
          sla: 'Critical SLA breach, entire floor remains offline',
          escalation: 'Delayed escalation causes extended downtime',
          explanation: 'Incorrect. With 50+ users affected and both Wi-Fi and wired connections down, this is clearly an infrastructure issue, not individual device problems.'
        },
        {
          text: 'Check if users can access internet from mobile hotspots',
          correct: false,
          sla: 'Response time exceeded, business operations halted',
          escalation: 'Ineffective escalation, doesn\'t address root cause',
          explanation: 'Incorrect. While this might provide temporary workaround, it doesn\'t address the infrastructure failure causing the outage.'
        },
        {
          text: 'Verify network cable connections in server room',
          correct: true,
          sla: 'Response within 15 minutes, coordinate with network team',
          escalation: 'Escalate to network team for infrastructure check',
          explanation: 'Correct. Physical infrastructure check is appropriate for floor-wide connectivity loss. This should be done alongside switch status verification.'
        }
      ]
    },
    {
      title: 'Scenario 3: Access Request',
      issue: 'New employee needs access to SharePoint site and specific distribution lists. Request submitted through proper approval workflow.',
      users: '1 user (new employee)',
      impact: 'Low - User cannot access required resources, but not blocking critical work yet',
      actions: [
        {
          text: 'Verify approval in ticketing system, then grant access in AD and SharePoint',
          correct: true,
          sla: 'Response within 2 hours, resolution within 1 business day',
          escalation: 'No escalation needed for standard access request',
          explanation: 'Correct. Standard access requests follow approval workflow. Once verified, grant access per documented procedures.'
        },
        {
          text: 'Immediately grant access without verification',
          correct: false,
          sla: 'Security risk, may violate access control policies',
          escalation: 'Potential security incident if unauthorized access granted',
          explanation: 'Incorrect. Always verify approval before granting access to maintain security and compliance with access control policies.'
        },
        {
          text: 'Escalate to security team for review',
          correct: false,
          sla: 'Unnecessary escalation delays resolution',
          escalation: 'Over-escalation for standard request',
          explanation: 'Incorrect. Standard access requests with proper approval don\'t require security team escalation unless there are special circumstances.'
        },
        {
          text: 'Ask user to resubmit request with more details',
          correct: false,
          sla: 'Delayed resolution, user remains without access',
          escalation: 'Inefficient process, request already contains required information',
          explanation: 'Incorrect. If the request has proper approval and required details, proceed with access grant rather than requesting additional information.'
        }
      ]
    }
  ];

  let currentScenario = null;

  // Start scenario - randomly select and display
  const startScenario = () => {
    // Randomly select a scenario
    currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    // Hide intro, show content
    scenarioIntro.classList.add('hidden');
    scenarioContent.classList.remove('hidden');
    scenarioResult.classList.add('hidden');
    
    // Populate scenario details
    document.getElementById('scenario-title').textContent = currentScenario.title;
    document.getElementById('incident-issue').textContent = currentScenario.issue;
    document.getElementById('incident-users').textContent = currentScenario.users;
    document.getElementById('incident-impact').textContent = currentScenario.impact;
    
    // Clear and populate actions
    actionsContainer.innerHTML = '';
    currentScenario.actions.forEach((action, index) => {
      const btn = document.createElement('button');
      btn.className = 'scenario-action-btn';
      btn.textContent = action.text;
      btn.setAttribute('data-index', index);
      btn.addEventListener('click', () => handleActionChoice(action, btn));
      actionsContainer.appendChild(btn);
      
      // Add staggered animation
      setTimeout(() => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateX(-20px)';
        btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          btn.style.opacity = '1';
          btn.style.transform = 'translateX(0)';
        }, 50);
      }, index * 100);
    });
    
    // Scroll to scenario
    scenarioContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle user action choice
  const handleActionChoice = (chosenAction, clickedBtn) => {
    // Mark clicked button as selected
    clickedBtn.classList.add('selected');
    
    // Disable all action buttons
    document.querySelectorAll('.scenario-action-btn').forEach(btn => {
      btn.disabled = true;
      if (btn !== clickedBtn) {
        btn.style.opacity = '0.5';
      }
      btn.style.cursor = 'not-allowed';
    });
    
    // Show result
    scenarioResult.classList.remove('hidden');
    
    // Populate result
    document.getElementById('result-choice').textContent = chosenAction.text;
    
    // Set correctness badge
    const correctnessBadge = document.getElementById('result-correctness');
    if (chosenAction.correct) {
      correctnessBadge.textContent = '✓ Correct';
      correctnessBadge.className = 'correctness-badge correct';
    } else {
      correctnessBadge.textContent = '✗ Incorrect';
      correctnessBadge.className = 'correctness-badge incorrect';
    }
    
    document.getElementById('result-sla').textContent = chosenAction.sla;
    document.getElementById('result-escalation').textContent = chosenAction.escalation;
    document.getElementById('result-explanation').textContent = chosenAction.explanation;
    
    // Scroll to result
    scenarioResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // End scenario - reset to intro
  const endScenario = () => {
    scenarioIntro.classList.remove('hidden');
    scenarioContent.classList.add('hidden');
    scenarioResult.classList.add('hidden');
    currentScenario = null;
    
    // Re-enable buttons
    document.querySelectorAll('.scenario-action-btn').forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    });
    
    // Scroll to intro
    scenarioIntro.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Event listeners
  startBtn.addEventListener('click', startScenario);
  endBtn.addEventListener('click', endScenario);
  tryAnotherBtn.addEventListener('click', () => {
    scenarioResult.classList.add('hidden');
    startScenario();
  });
})();

// Story Mode: Get to Know Me
(function() {
  'use strict';

  const startStoryBtn = document.getElementById('startStoryBtn');
  const storyIntro = document.getElementById('story-intro');
  const storyContent = document.getElementById('story-content');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressText = document.getElementById('story-progress-text');
  const slides = document.querySelectorAll('.story-slide');
  const pathButtons = document.querySelectorAll('.path-btn');
  
  let currentSlide = 0;
  let selectedTrack = null;

  // Track-specific content data
  const trackContent = {
    support: {
      skills: [
        'Windows 10/11, macOS, Microsoft 365, Active Directory, Azure AD, Intune',
        'DNS, DHCP, TCP/IP, VPN, printers/POS'
      ],
      achievements: [
        'Structured incident handling and documentation',
        'Hardware, printer, POS, payment terminal troubleshooting'
      ],
      highlightProjects: []
    },
    dev: {
      skills: [
        'HTML, CSS, JavaScript, Node.js, Express, REST APIs, Next.js',
        'PostgreSQL, Supabase, Git/GitHub'
      ],
      achievements: [
        'Built full-stack systems with auth + database integration',
        'Deployed live applications and iterated with feedback'
      ],
      highlightProjects: ['dev']
    },
    freelance: {
      skills: [
        'Client requirement gathering, responsive UI, deployment/maintenance',
        'HTML/CSS/JS, performance, mobile-first design'
      ],
      achievements: [
        'Delivered production café websites',
        'Maintained updates based on owner feedback'
      ],
      highlightProjects: ['freelance']
    }
  };

  // Initialize story
  const startStory = () => {
    storyIntro.classList.add('hidden');
    storyContent.classList.remove('hidden');
    currentSlide = 0;
    selectedTrack = null;
    updateSlide();
    updateProgress();
    
    // Focus for keyboard navigation
    storyContent.focus();
    
    // Scroll to story
    storyContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Update slide display
  const updateSlide = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    // Update navigation buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;

    // Update dynamic content based on track
    if (currentSlide === 2 && selectedTrack) {
      updateSkillsContent();
    } else if (currentSlide === 3 && selectedTrack) {
      updateAchievementsContent();
    } else if (currentSlide === 4) {
      updateProjectsHighlight();
    }
  };

  // Update progress indicator
  const updateProgress = () => {
    progressText.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
  };

  // Update skills content based on track
  const updateSkillsContent = () => {
    const skillsContent = document.getElementById('skills-content');
    const content = trackContent[selectedTrack];
    
    if (content) {
      skillsContent.innerHTML = '<ul>';
      content.skills.forEach(skill => {
        skillsContent.innerHTML += `<li>${skill}</li>`;
      });
      skillsContent.innerHTML += '</ul>';
    }
  };

  // Update achievements content based on track
  const updateAchievementsContent = () => {
    const trackAchievements = document.getElementById('track-achievements');
    const content = trackContent[selectedTrack];
    
    if (content) {
      trackAchievements.innerHTML = '<ul>';
      content.achievements.forEach(achievement => {
        trackAchievements.innerHTML += `<li>${achievement}</li>`;
      });
      trackAchievements.innerHTML += '</ul>';
    }
  };

  // Update projects highlight based on track
  const updateProjectsHighlight = () => {
    const projectItems = document.querySelectorAll('.project-item');
    const content = trackContent[selectedTrack];
    
    projectItems.forEach(item => {
      item.classList.remove('highlighted');
      if (content && content.highlightProjects.length > 0) {
        const itemTrack = item.getAttribute('data-track');
        if (content.highlightProjects.includes(itemTrack)) {
          item.classList.add('highlighted');
        }
      }
    });
  };

  // Handle path selection
  const handlePathSelection = (track) => {
    selectedTrack = track;
    
    // Update button states
    pathButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-track') === track);
    });
    
    // Auto-advance to next slide after selection
    setTimeout(() => {
      nextSlide();
    }, 300);
  };

  // Navigate to next slide
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlide();
      updateProgress();
    }
  };

  // Navigate to previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide();
      updateProgress();
    }
  };

  // Keyboard navigation
  const handleKeyPress = (e) => {
    // Only handle if story is active
    if (storyContent.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentSlide < slides.length - 1) {
        nextSlide();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentSlide > 0) {
        prevSlide();
      }
    } else if (e.key === 'Enter') {
      // Handle Enter key for primary actions
      if (currentSlide === 1) {
        // On path selection slide, Enter on selected button
        const selectedBtn = document.querySelector('.path-btn.selected');
        if (selectedBtn) {
          nextSlide();
        }
      } else if (currentSlide < slides.length - 1) {
        nextSlide();
      }
    }
  };

  // Event listeners
  startStoryBtn.addEventListener('click', startStory);
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  pathButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.getAttribute('data-track');
      handlePathSelection(track);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyPress);

  // Make story content focusable for keyboard navigation
  if (storyContent) {
    storyContent.setAttribute('tabindex', '-1');
  }
})();

// Three.js Hero Background
(function() {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  let scene, camera, renderer;
  let spheres = [];
  let particles = null;
  let animationId = null;
  let isAnimating = false;
  let isPageVisible = true;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check WebGL support
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    canvas.style.display = 'none';
    return;
  }

  // Initialize Three.js scene
  const initThreeJS = () => {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, using fallback background');
      canvas.style.display = 'none';
      return;
    }

    try {
      const { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, BufferGeometry, PointsMaterial, LineBasicMaterial, EdgesGeometry, LineSegments, Points: PointsMesh, Float32BufferAttribute } = THREE;

      scene = new Scene();
      
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create wireframe spheres with more variety
      for (let i = 0; i < 12; i++) {
        const radius = 0.3 + Math.random() * 0.4;
        const sphereGeometry = new SphereGeometry(radius, 16, 16);
        const edgesGeometry = new EdgesGeometry(sphereGeometry);
        const lineMaterial = new LineBasicMaterial({ 
          color: 0x2563eb,
          transparent: true,
          opacity: 0.5
        });

        const edges = new LineSegments(edgesGeometry, lineMaterial);
        edges.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        );
        edges.userData = {
          speed: 0.003 + Math.random() * 0.004,
          rotationSpeed: 0.002 + Math.random() * 0.003,
          radius: radius
        };
        scene.add(edges);
        spheres.push(edges);
      }

      // Create particles with more density
      const particleCount = 300;
      const particleGeometry = new BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 12;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 8;
      }

      particleGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
      const particleMaterial = new PointsMaterial({
        color: 0x2563eb,
        size: 0.08,
        transparent: true,
        opacity: 0.7
      });
      particles = new PointsMesh(particleGeometry, particleMaterial);
      scene.add(particles);

      // Update colors based on theme
      updateThemeColors();

      // Start animation if motion is allowed
      if (!prefersReducedMotion && isPageVisible) {
        animate();
      }
    } catch (error) {
      console.warn('Three.js not available, using fallback background');
      canvas.style.display = 'none';
    }
  };

  // Update colors based on current theme
  const updateThemeColors = () => {
    if (!scene) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? 0x60a5fa : 0x2563eb;
    const particleColor = isDark ? 0x93c5fd : 0x3b82f6;

    spheres.forEach(sphere => {
      if (sphere.material) {
        sphere.material.color.setHex(lineColor);
        sphere.material.opacity = isDark ? 0.3 : 0.4;
      }
    });

    if (particles && particles.material) {
      particles.material.color.setHex(particleColor);
      particles.material.opacity = isDark ? 0.5 : 0.6;
    }
  };

  // Animation loop
  const animate = () => {
    if (!isPageVisible || prefersReducedMotion) {
      isAnimating = false;
      return;
    }

    isAnimating = true;
    animationId = requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      // Rotate spheres
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += sphere.userData.rotationSpeed;
        sphere.rotation.y += sphere.userData.rotationSpeed;
        sphere.position.y += sphere.userData.speed;
        if (sphere.position.y > 4) {
          sphere.position.y = -4;
        }
      });

      // Rotate particles
      if (particles) {
        particles.rotation.y += 0.001;
      }

      // Slow camera rotation
      camera.position.x = Math.sin(Date.now() * 0.0001) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.0001) * 0.3;
      camera.lookAt(0, 0, 0);
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  // Handle resize
  const handleResize = () => {
    if (!camera || !renderer) return;
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  // Page Visibility API
  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden;
    
    if (isPageVisible && !prefersReducedMotion && !isAnimating) {
      animate();
    } else if (!isPageVisible && isAnimating) {
      cancelAnimationFrame(animationId);
      isAnimating = false;
    }
  };

  // Reduced motion listener
  const handleReducedMotion = (e) => {
    prefersReducedMotion = e.matches;
    
    if (prefersReducedMotion && isAnimating) {
      cancelAnimationFrame(animationId);
      isAnimating = false;
    } else if (!prefersReducedMotion && isPageVisible && !isAnimating) {
      animate();
    }
  };

  // Theme change listener
  const handleThemeChange = () => {
    updateThemeColors();
  };

  // Initialize - wait for Three.js to load
  const init = () => {
    if (typeof THREE !== 'undefined') {
      initThreeJS();
    } else {
      // Retry after a short delay if Three.js hasn't loaded yet
      setTimeout(() => {
        if (typeof THREE !== 'undefined') {
          initThreeJS();
        } else {
          canvas.style.display = 'none';
        }
      }, 100);
    }
  };

  if (document.readyState === 'loading') {
    window.addEventListener('load', init);
  } else {
    init();
  }

  window.addEventListener('resize', handleResize);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotionMedia.addEventListener('change', handleReducedMotion);

  // Listen for theme changes
  const observer = new MutationObserver(handleThemeChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (renderer) {
      renderer.dispose();
    }
    observer.disconnect();
  });
})();

// Hamburger Menu & Sidebar
(function() {
  'use strict';

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');
  const mainThemeToggle = document.getElementById('themeToggle');

  function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    sidebarOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebarOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open sidebar
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openSidebar);
  }

  // Close sidebar
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Close on overlay click
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close on link click
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Sync theme toggle with main toggle
  if (sidebarThemeToggle && mainThemeToggle) {
    sidebarThemeToggle.addEventListener('click', () => {
      mainThemeToggle.click();
    });
  }

  // Update sidebar theme icon
  const updateSidebarThemeIcon = () => {
    if (sidebarThemeToggle) {
      const theme = document.documentElement.getAttribute('data-theme');
      const icon = sidebarThemeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
    }
  };

  // Watch for theme changes
  const themeObserver = new MutationObserver(updateSidebarThemeIcon);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Initial theme icon update
  updateSidebarThemeIcon();
})();

// Projects Slideshow Stack
(function() {
  'use strict';

  const projectCards = document.querySelectorAll('.projects-stack .project-card');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const dotsContainer = document.getElementById('projectDots');
  
  if (!projectCards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragOffset = 0;
  let currentCard = null;
  let dragVelocity = 0;
  let lastDragX = 0;
  let lastDragTime = 0;
  let animationFrame = null;

  // Create dots
  projectCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'project-dot';
    dot.setAttribute('aria-label', `Go to project ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToProject(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.project-dot');

  function updateProjects() {
    projectCards.forEach((card, index) => {
      const cardIndex = parseInt(card.dataset.index);
      let diff = cardIndex - currentIndex;
      
      // Handle wrapping for circular navigation
      if (diff > projectCards.length / 2) {
        diff = diff - projectCards.length;
      } else if (diff < -projectCards.length / 2) {
        diff = diff + projectCards.length;
      }
      
      card.classList.remove('active');
      
      // Calculate base transform
      let translateX = -50;
      let translateY = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 4;
      
      if (diff === 0) {
        // Active card - apply drag offset if dragging
        translateX = -50 + (isDragging ? dragOffset : 0);
        translateY = 0;
        scale = 1;
        opacity = 1;
        zIndex = 4;
        card.classList.add('active');
        currentCard = card;
      } else if (Math.abs(diff) === 1) {
        // Next/Previous card
        translateY = 20;
        scale = 0.95;
        opacity = 0.6;
        zIndex = 3;
      } else if (Math.abs(diff) === 2) {
        // Second layer
        translateY = 40;
        scale = 0.9;
        opacity = 0.4;
        zIndex = 2;
      } else {
        // Further back
        translateY = 60;
        scale = 0.85;
        opacity = 0.2;
        zIndex = 1;
      }
      
      card.style.transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      if (!isDragging) {
        card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Update button states (allow looping)
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  function goToProject(index) {
    if (index < 0 || index >= projectCards.length) return;
    currentIndex = index;
    updateProjects();
  }

  function nextProject() {
    if (currentIndex < projectCards.length - 1) {
      goToProject(currentIndex + 1);
    } else {
      goToProject(0); // Loop to first
    }
  }

  function prevProject() {
    if (currentIndex > 0) {
      goToProject(currentIndex - 1);
    } else {
      goToProject(projectCards.length - 1); // Loop to last
    }
  }

  // Event listeners
  nextBtn.addEventListener('click', nextProject);
  prevBtn.addEventListener('click', prevProject);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    const rect = projectsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      }
    }
  });

  // Smooth drag and swipe support
  const stack = document.querySelector('.projects-stack');
  const activeCard = () => document.querySelector('.projects-stack .project-card.active');
  
  function smoothDragUpdate() {
    if (!isDragging) return;
    updateProjects();
    animationFrame = requestAnimationFrame(smoothDragUpdate);
  }
  
  if (stack) {
    // Mouse drag support
    stack.addEventListener('mousedown', (e) => {
      const card = e.target.closest('.project-card');
      if (!card || !card.classList.contains('active')) return;
      if (e.target.closest('.project-link')) return; // Don't drag if clicking link
      
      isDragging = true;
      dragStartX = e.clientX;
      lastDragX = e.clientX;
      lastDragTime = Date.now();
      dragOffset = 0;
      dragVelocity = 0;
      card.style.cursor = 'grabbing';
      card.style.transition = 'none';
      e.preventDefault();
      
      // Start smooth update loop
      animationFrame = requestAnimationFrame(smoothDragUpdate);
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const now = Date.now();
      const deltaTime = now - lastDragTime;
      const deltaX = e.clientX - lastDragX;
      
      // Calculate velocity for momentum
      if (deltaTime > 0) {
        dragVelocity = (deltaX / deltaTime) * 16; // Normalize to ~60fps
      }
      
      dragOffset = ((e.clientX - dragStartX) / window.innerWidth) * 100;
      // Apply easing for smoother feel at edges
      const maxDrag = 35;
      if (Math.abs(dragOffset) > maxDrag) {
        const excess = Math.abs(dragOffset) - maxDrag;
        dragOffset = dragOffset > 0 ? maxDrag + excess * 0.3 : -(maxDrag + excess * 0.3);
      }
      
      lastDragX = e.clientX;
      lastDragTime = now;
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      
      isDragging = false;
      const card = activeCard();
      if (card) {
        card.style.cursor = 'grab';
        card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      
      // Use velocity for momentum-based snapping
      const velocityThreshold = 0.5;
      const positionThreshold = 12; // 12% of screen width
      
      let shouldSwitch = false;
      let direction = 0;
      
      if (Math.abs(dragVelocity) > velocityThreshold) {
        // Velocity-based switching
        shouldSwitch = true;
        direction = dragVelocity > 0 ? 1 : -1;
      } else if (Math.abs(dragOffset) > positionThreshold) {
        // Position-based switching
        shouldSwitch = true;
        direction = dragOffset > 0 ? 1 : -1;
      }
      
      if (shouldSwitch) {
        if (direction > 0) {
          prevProject();
        } else {
          nextProject();
        }
      }
      
      dragOffset = 0;
      dragVelocity = 0;
      updateProjects();
    });

    // Touch/swipe support with smooth momentum
    stack.addEventListener('touchstart', (e) => {
      const card = e.target.closest('.project-card');
      if (!card || !card.classList.contains('active')) return;
      if (e.target.closest('.project-link')) return;
      
      touchStartX = e.touches[0].clientX;
      isDragging = true;
      dragStartX = touchStartX;
      lastDragX = touchStartX;
      lastDragTime = Date.now();
      dragOffset = 0;
      dragVelocity = 0;
      card.style.transition = 'none';
      
      animationFrame = requestAnimationFrame(smoothDragUpdate);
    }, { passive: true });

    stack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const touchX = e.touches[0].clientX;
      const now = Date.now();
      const deltaTime = now - lastDragTime;
      const deltaX = touchX - lastDragX;
      
      // Calculate velocity
      if (deltaTime > 0) {
        dragVelocity = (deltaX / deltaTime) * 16;
      }
      
      dragOffset = ((touchX - dragStartX) / window.innerWidth) * 100;
      // Apply easing at edges
      const maxDrag = 35;
      if (Math.abs(dragOffset) > maxDrag) {
        const excess = Math.abs(dragOffset) - maxDrag;
        dragOffset = dragOffset > 0 ? maxDrag + excess * 0.3 : -(maxDrag + excess * 0.3);
      }
      
      lastDragX = touchX;
      lastDragTime = now;
    }, { passive: true });

    stack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      touchEndX = e.changedTouches[0].clientX;
      isDragging = false;
      
      const card = activeCard();
      if (card) {
        card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      
      // Velocity and position-based snapping
      const velocityThreshold = 0.5;
      const positionThreshold = 12;
      
      let shouldSwitch = false;
      let direction = 0;
      
      if (Math.abs(dragVelocity) > velocityThreshold) {
        shouldSwitch = true;
        direction = dragVelocity > 0 ? 1 : -1;
      } else if (Math.abs(dragOffset) > positionThreshold) {
        shouldSwitch = true;
        direction = dragOffset > 0 ? 1 : -1;
      }
      
      if (shouldSwitch) {
        if (direction > 0) {
          prevProject();
        } else {
          nextProject();
        }
      }
      
      dragOffset = 0;
      dragVelocity = 0;
      updateProjects();
    }, { passive: true });
  }

  // Click on non-active cards to navigate
  projectCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('active') && !e.target.closest('.project-link')) {
        goToProject(index);
      }
    });
  });

  // Initialize
  updateProjects();
})();

// Interactive 3D Mouse Tracking Effects
(function() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Skip if reduced motion is preferred
  }

  const cards = document.querySelectorAll('.content-card, .skill-category, .experience-item, .stat-item');
  const projectCards = document.querySelectorAll('.projects-stack .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) translateY(-8px) translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = hero.querySelector('.hero-container');
      
      if (heroContent && scrollY < window.innerHeight) {
        const parallaxValue = scrollY * 0.5;
        heroContent.style.transform = `translateY(${parallaxValue}px) translateZ(0)`;
      }
      
      lastScrollY = scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 3D tilt effect for hero photo
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    heroPhoto.addEventListener('mousemove', (e) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      heroPhoto.style.transform = `perspective(1000px) scale(1.05) translateZ(20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroPhoto.addEventListener('mouseleave', () => {
      heroPhoto.style.transform = '';
    });
  }

  // Section parallax on scroll
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const scrollProgress = entry.intersectionRatio;
        entry.target.style.transform = `translateY(${scrollProgress * 20}px) translateZ(0)`;
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
})();

