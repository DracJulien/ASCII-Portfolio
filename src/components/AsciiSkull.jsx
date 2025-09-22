const FRONT_FRAME = [
  '                      :::!~!!!!!:.           ',
  '                 .xUHWH!! !!?M88WHX:.        ',
  '               .X*#M@$!!  !X!M$$$$$$WWx:.    ',
  '              :!!!!!!?H! :!$!$$$$$$$$$$8X:   ',
  '             !!~  ~:~!! :~!$!#$$$$$$$$$$8X:  ',
  '            :!~::!H!<   ~.U$X!?R$$$$$$$$MM!  ',
  '            ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!  ',
  '              !:~~~ .:!M"T#$$$$WX??#MRRMMM!  ',
  '              ~?WuxiW*`   `"#$#$$$$8!!!!??!  ',
  '            :X- M$$$$       `"T#$T~!8$WUXU~  ',
  '           :%`  ~#$$$m:        ~!~ ?$$$$$$   ',
  '          :!`.-   ~T$$$$8xx.  .xWW- ""*".    ',
  '         ~~!    T#$$@@W@M$$$$.*?$$     /     ',
  '         .!~~ !!     .:XUW$W!~ `"~:    :     ',
  '         `!!  !H:   !WM$$$$Ti.: .!WUn+!`     ',
  '        X~ .: ?H.!u "$$$B$$$!W:U!T$$M~       ',
  '        !.-~   ?@WTWo("*$$$W$TH$! `          ',
  '        -~    : ?$$$B$Wu("**$RM!             ',
  '              :   ~$$$$$B$$en:`              ',
  '            :     ~"##*$$$$M~                ',
].join('\n')

export default function AsciiSkull({ className = '' }) {
  const classes = ['ascii-skull', className].filter(Boolean).join(' ')
  return (
    <pre className={classes} aria-hidden='true'>
      {FRONT_FRAME}
    </pre>
  )
}
