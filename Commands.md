# pm2
- pm2 stop ...
- pm2 restart ...
- pm2 reload ...
- pm2 delete ...
    - instead of appName use "all" for every process or the "id" for that specific process

- pm2 [list|ls|status] - List the status of all application managed by PM2
- pm2 monit - cmd monitor tool
- pm2 plus - web dashboard monitor tool

# Nginx

    ### websockets dashboard log 
    - goaccess /var/log/nginx/access.log -o /var/www/helloespresso/html/report.html --log-format=COMBINED --real-time-html

    ### check for errors, reload conf, and check status
    - sudo nginx -t && systemctl reload nginx && systemctl status nginx || systemctl restart nginx && systemctl status nginx

    ### restart 
    - sudo systemctl restart nginx

    ### list packages
    - nginx -V 2>&1 | tr ' ' '\n'


# fail2ban
- /etc/fail2ban/filter.d/nginx-limit-req.conf
- /var/log/fail2ban.log
- /var/log/nginx/error.log

    ### cli realtime log of flagged bans and hits
    - tail -f /var/log/fail2ban.log

    ### check if active
    - sudo fail2ban-client status
    - sudo fail2ban-client -d
    - sudo sudo fail2ban-client status nginx-limit-req
    - sudo fail2ban-client set nginx-limit-req unbanip 127.0.0.1


    ### restart after changes
    - service fail2ban restart

    ### regex test
    - fail2ban-regex /var/log/nginx/error.log /etc/fail2ban/filter.d/nginx-limit-req.conf
    - fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/nginx-login.conf
