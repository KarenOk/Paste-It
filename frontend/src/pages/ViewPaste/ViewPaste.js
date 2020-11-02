import React from "react";
import copy from "../../images/copy.svg";
import "./ViewPaste.css";

const ViewPaste = () => {
	return (
		<main className="view-paste">
			<div className="content">
				<button className="">
					<img src={copy} alt="" />
					Copy to Clipboard
					{/* {"Copied!"} */}
				</button>

				<p>
					{` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies tristique nulla aliquet enim tortor at auctor urna. Sit amet risus nullam eget. Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. A arcu cursus vitae congue mauris rhoncus aenean vel. In ornare quam viverra orci sagittis eu volutpat. \n \n \n Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Id volutpat lacus laoreet non curabitur gravida arcu. At volutpat diam ut venenatis tellus in metus vulputate eu. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Mauris augue neque gravida in fermentum et. Faucibus turpis in eu mi. In metus vulputate eu scelerisque felis imperdiet proin. Ut eu sem integer vitae. At imperdiet dui accumsan sit. Varius vel pharetra vel turpis nunc. Tellus id interdum velit laoreet id donec. Mattis aliquam faucibus purus in massa tempor. Lectus nulla at volutpat diam ut. Egestas sed tempus urna et pharetra pharetra. \n \n \n Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Donec enim diam vulputate ut pharetra sit amet. Eleifend donec pretium vulputate sapien nec sagittis. Nibh sed pulvinar proin gravida hendrerit lectus. Proin fermentum leo vel orci. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Tempus urna et pharetra pharetra massa massa ultricies. Odio ut sem nulla pharetra diam sit amet. Auctor eu augue ut lectus arcu. Tincidunt vitae semper quis lectus nulla at volutpat. Suspendisse in est ante in nibh mauris cursus mattis. Diam vulputate ut pharetra sit amet. Lacinia quis vel eros donec ac odio tempor. Mattis molestie a iaculis at. Convallis convallis tellus id interdum velit. Donec enim diam vulputate ut pharetra sit amet. Mollis aliquam ut porttitor leo a diam sollicitudin. \n \n \n Rhoncus mattis rhoncus urna neque. Adipiscing commodo elit at imperdiet dui accumsan sit. Phasellus egestas tellus rutrum tellus pellentesque eu. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Porttitor lacus luctus accumsan tortor posuere ac ut. Proin sed libero enim sed faucibus turpis. Purus sit amet luctus venenatis lectus magna fringilla. Volutpat lacus laoreet non curabitur gravida arcu. In vitae turpis massa sed elementum tempus egestas. Fermentum posuere urna nec tincidunt praesent. Dignissim suspendisse in est ante. Pharetra sit amet aliquam id diam. In massa tempor nec feugiat nisl.\n \n \n`}
				</p>
			</div>
		</main>
	);
};

export default ViewPaste;
