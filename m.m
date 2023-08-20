xn_input = app.XnEditField.Value; %------------ xn
while true
    if isempty(regexp(xn_input, '[^0-9., ]', 'once'))
        app.Lamp.Color = 'green';
        break;
    else
        app.Lamp.Color = 'red';
        return;
    end
end
fxn_input = app.fXnEditField.Value; %------------f(xn)
while true
    if isempty(regexp(fxn_input, '[^0-9., ]', 'once'))
        app.Lamp_2.Color = 'green';
        break;
    else
        app.Lamp_2.Color = 'red';
        return;
    end
end
xi_in = app.xEditField.Value; %------------ x


xi = strrep(xi_in, ',', '.');

xn_input_rep = strrep(xn_input, ',', '.');
xnum_strs = strsplit(xn_input_rep);
xn_array = str2double(xnum_strs);
fxn_input_rep = strrep(fxn_input, ',', '.');
ynum_strs = strsplit(fxn_input_rep);
fxn_array = str2double(ynum_strs);

disp(xn_input);
disp(xn_array);
disp(fxn_array);
disp(fxn_array(2));
i = 1;
j = 1;
k = 1;
n = length(xn_array);
L_xi = 0;
lenom_str = "fx = ";
while true
    if (xi >= xn_array(1) && xi <= xn_array(n))
        app.Lamp_3.Color = 'green';
        break;
    else
        app.Lamp_3.Color = 'red';
        disp('не в интервале')
        return;
    end
end
disp('nnnnnnn')
disp(xn_array(10))
while true
    if (length(xn_array) == length(fxn_array))
   
        break;
    else
       app.Lamp_3.Color = 'yellow';
        disp('длина не совпадает')
        return;
    end
end
while(i <= n)
    prsq_botton = 1;
    prsq_top = 1;
   while(j <= n)
       if(j == i && j < n)
           j = j + 1;
          
       end
       if(i == n)
           while(k < n)
               prsq_botton_el = xn_array(i) - xn_array(k);
               prsq_botton = prsq_botton * prsq_botton_el;
               prsq_top_el = xi - xn_array(k);
               prsq_top = prsq_top * prsq_top_el;
               k = k + 1;
           end
           break
       end
       prsq_botton_el = xn_array(i) - xn_array(j);
       prsq_botton = prsq_botton * prsq_botton_el;
       prsq_top_el = xi - xn_array(j);
       prsq_top = prsq_top * prsq_top_el;
       j = j + 1;
   end
   prsq = prsq_top/prsq_botton;
   L_xi = L_xi + prsq * fxn_array(i);
   disp('botooooon')
   disp(prsq_botton)
   if(i == 1)
       lenom_str = lenom_str + "L(x)" + '*' + num2str(fxn_array(1));

   else
       lenom_str = lenom_str + '+' + "L(x)" + '*' + num2str(fxn_array(i));
   end
      
  
  
   j = 1;
   k = 1;
 
   i = i + 1;
  
end
disp(L_xi)
lout = num2str(L_xi);
app.LXTextArea.Value = lout;
hold(app.UIAxes, 'on')
f = 1;
while(f <= n)
    plot(app.UIAxes, xn_array(f), fxn_array(f), 'x');
    f = f + 1;
end
plot(app.UIAxes, xn_array, fxn_array);
plot(app.UIAxes, xi, L_xi,'ro');
hold(app.UIAxes, 'off')
disp(lenom_st